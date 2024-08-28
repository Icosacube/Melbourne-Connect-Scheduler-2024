export interface EmailContentProps {
    recipientTitle: string
    recipientName: string
    recipientEmail: string
    sender?: string
    formLink?: string
    contact?: string
}

// need to figure out a way to do formatted text in email
export const contactMCS = `<strong>Melbourne Connect</strong><br>
Chancellery | Research and Enterprise<br>
The University of Melbourne<br>
700 Swanston Street, Carlton 3053<br>
<strong>M:</strong> <a href="tel:0403267767">0403 267 767</a> <strong>E:</strong> <a href="mailto:Janelle.Karatekeli@unimelb.edu.au">Janelle.Karatekeli@unimelb.edu.au</a><br>
<a href="https://melbconnect.com.au">melbconnect.com.au</a> | Follow us: <a href="https://twitter.com/melbconnect">Twitter</a> | <a href="https://www.linkedin.com/showcase/melbourne-connect">LinkedIn</a> | <a href="https://www.instagram.com/melbconnect/">Instagram</a>`
