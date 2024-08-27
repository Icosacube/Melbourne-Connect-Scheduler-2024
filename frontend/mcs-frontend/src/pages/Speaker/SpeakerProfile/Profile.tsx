import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox'
import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { ProfileHeaderCard } from '../../../components'
import { Speaker } from '../../../types/frontendTypes'

interface ProfileProps {
    speaker: Speaker
}

export const Profile: React.FC<ProfileProps> = ({ speaker }) => {
    const email = speaker.PrimaryEmail
    const phone = speaker.Phone
    const bio = speaker.Bio

    // email variables and stuff
    const professorName = 'Ellen Xhaka'
    const recipientName = 'Frances Haugen'
    const topic = 'Discussing AI Safety'
    const availableTimes = [
        'Monday, June 6th, 10:00 AM',
        'Wednesday, June 8th, 2:00 PM',
        'Friday, June 10th, 11:00 AM',
        'Tuesday, June 14th, 3:00 PM',
    ]
    const contactInformation =
        'Email: frances@example.com | Phone: +1 (123) 456-7890'
    const formLink =
        'https://airtable.com/app79kFx8O6KyDmzX/pag336RqzBNZZTYCd/form'
    const emailSubject = `Meeting Availability for ${professorName}`
    const emailBody = `Dear ${recipientName},

I hope this email finds you well. I am reaching out to discuss the possibility of scheduling a meeting to discuss ${topic}.

I am available for a meeting at the following times:

- ${availableTimes[0]}
- ${availableTimes[1]}
- ${availableTimes[2]}
- ${availableTimes[3]}

Please let me know which of these options works best for you, or if you have any alternative times in mind. Additionally, feel free to suggest a preferred meeting platform (e.g., Zoom, Microsoft Teams) or location if an in-person meeting is possible.

Additionally, please use this form to submit personal information about yourself: ${formLink}

I look forward to hearing from you and finding a mutually convenient time to meet.

Best regards,
Professor ${professorName}
${contactInformation}`
    const mailtoLink = `mailto:fhughes@stockton.edu.au?subject=${encodeURIComponent(
        emailSubject
    )}&body=${encodeURIComponent(emailBody)}`

    return (
        <Box className=" flex space-x-6">
            <Box className="w-9/12  ">
                <Box className="pb-10">
                    <ProfileHeaderCard speaker={speaker} />
                </Box>
                <Paper className="p-10">
                    <Typography variant="h6">Bio</Typography>
                    <Typography
                        paragraph
                        className="bg-gray-100 rounded-xl p-5 mt-4"
                    >
                        {bio}
                    </Typography>
                </Paper>
            </Box>
            <Box className="w-3/12 flex-col space-y-5 h-fit">
                <Paper className="p-7 w-full">
                    <Typography variant="h4">Contact</Typography>
                    <Box className="flex space-x-4 mt-3">
                        <Typography variant="h6">Email: </Typography>
                        <Typography variant="h6" className="font-semibold">
                            {email}
                        </Typography>
                    </Box>
                    <Box className="flex space-x-4 mt-3">
                        <Typography variant="h6">Phone: </Typography>
                        <Typography variant="h6" className="font-semibold">
                            {phone}
                        </Typography>
                    </Box>
                </Paper>

                <Button
                    startIcon={<ForwardToInboxIcon />}
                    variant="contained"
                    onClick={(e) => {
                        window.location.href = mailtoLink
                        e.preventDefault()
                    }}
                    // sx={{ textTransform: 'none' }}
                    className="p-6 text-lowercase bg-primary normal-case  hover:bg-secondary text-black "
                >
                    <Typography className=" font-bold">
                        Availability Canvassing
                    </Typography>
                </Button>

                {/* <Box className="bg-white shadow-lg p-7 rounded-xl w-full">
          <Typography variant="h4">Correspondance</Typography>
        </Box> */}
            </Box>
        </Box>
    )
}
