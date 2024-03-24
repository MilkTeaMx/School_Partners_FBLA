import { EmailTemplate } from '../../components/emailTemplate';
import { Resend } from 'resend';
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

const resend = new Resend('re_cKyCtiUY_9cKPJqsGZhaqj8YwjEiqoP5C');

export async function POST(
    request: Request, 
  ) {

    const currentUser = await getCurrentUser();

    const body = await request.json();
    const { 
        listingId,
        startDate,
        endDate,
        orgEmail,
        description
       } = body;
    
       if (!listingId || !startDate || !endDate || !orgEmail || !currentUser?.email) {
        return NextResponse.error();
      }

    try {
        const data = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: '25mx.free@gmail.com',
          subject: 'Setting up a Event / Meeting',
          html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
        });
        console.log(description)
        console.log(Response.json(data))
        return Response.json(data);
    }     catch (error) {
        return Response.json({ error });
    }
}


