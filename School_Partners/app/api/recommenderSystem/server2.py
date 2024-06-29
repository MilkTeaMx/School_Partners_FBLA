from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from bson import ObjectId
import numpy as np 

app = Flask(__name__)
CORS(app)

PRIVATE = "max:123"

def get_database():
    CONNECTION_STRING = f"mongodb+srv://{PRIVATE}@test.ypmxjhw.mongodb.net"
    client = MongoClient(CONNECTION_STRING)
    db = client.test
    listingColl = db.Listing
    userColl = db.User
    return listingColl, userColl

def get_recommendations(user_id, k=5):
    try:
        listingColl, userColl = get_database()
        
        allListingDescriptions = []
        allListings = {}

        for listing in listingColl.find():
            allListingDescriptions.append(listing['description'])
            allListings[str(listing['_id'])] = {
                'title': listing['title'],
                'description': listing['description'],
                'typeOfOrganization': listing['typeOfOrganization'],
                'email': listing['email'],
                'phoneNumber': listing['phoneNumber'],
                'locationValue': listing['locationValue']
            }
            
        vectorizer = TfidfVectorizer()
        vectorizer.fit(allListingDescriptions + ["apprenticeship", "scholarships", "discounts", "funding", 'field trips', 'supplies', 'services', 'community'])

        user = userColl.find_one({"_id": ObjectId(user_id)})
        if not user:
            return []  # User not found

        favoriteIds = user.get('favoriteIds', [])

        if not favoriteIds:
            explorableListings = list(listingColl.find({"userId": {"$ne": ObjectId(user_id)}}))
            recommendations = [{
                "id": str(listing['_id']),
                "similarity": None,  # or any default value for similarity
                "title": listing['title'],
                "description": listing['description'],
                "typeOfOrganization": listing['typeOfOrganization'],
                "email": listing['email'],
                "phoneNumber": listing['phoneNumber'],
                "locationValue": listing['locationValue']
            } for listing in explorableListings]
            return recommendations
        
        favoriteListings = []
        for fav_id in favoriteIds:
            fav_listing = listingColl.find_one({"_id": fav_id})
            if fav_listing:
                favoriteListings.append(fav_listing)
        
        latestListings = list(listingColl.find({"userId": ObjectId(user_id)}).sort("createdAt", -1).limit(1))

        listingDescriptions = [listing['description'] for listing in favoriteListings] 
        listingCategories = [listing['category'] for listing in favoriteListings] 

        combinedDescriptions = [f"{desc} {cat}" for desc, cat in zip(listingDescriptions, listingCategories)]
        
        listingDescriptions_tfidf = vectorizer.transform(combinedDescriptions)
        avg_tfidf = np.asarray(listingDescriptions_tfidf.mean(axis=0)).flatten().reshape(1, -1)

        explorableListings = listingColl.find({"userId": {"$ne": ObjectId(user_id)}})
        
        explorableDescriptions = [f"{listing['description']} {listing['category']}" for listing in explorableListings]
        explorableIds = [str(listing['_id']) for listing in explorableListings]
        
        explorable_tfidf = vectorizer.transform(explorableDescriptions)
        
        # k-NN search
        knn = NearestNeighbors(n_neighbors=k, metric='cosine')
        knn.fit(explorable_tfidf)
        distances, indices = knn.kneighbors(avg_tfidf, return_distance=True)
        
        recommendations = []
        for i in range(k):
            idx = indices[0][i]
            distance = distances[0][i]
            listing_id = explorableIds[idx]
            recommendations.append({
                "id": listing_id,
                "similarity": 1 - distance,  # Converting cosine distance back to similarity
                "title": allListings[listing_id]['title'],
                "description": allListings[listing_id]['description'],
                "typeOfOrganization": allListings[listing_id]['typeOfOrganization'],
                "email": allListings[listing_id]['email'],
                "phoneNumber": allListings[listing_id]['phoneNumber'],
                "locationValue": allListings[listing_id]['locationValue']
            })
        
        return recommendations
    
    except Exception as e:
        print(f"Error in get_recommendations: {e}")
        return []

@app.route('/recommendations', methods=['GET'])
def recommendations():
    user_id = request.args.get('user_id')
    k = request.args.get('k', default=5, type=int)
    if not user_id:
        return jsonify({"error": "user_id parameter is required"}), 400
    
    try:
        recommendations = get_recommendations(user_id, k)
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8080)