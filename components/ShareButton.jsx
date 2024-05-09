import React from 'react'
import { FaShare } from 'react-icons/fa'
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'

const ShareButton = ({ property }) => {

  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property:
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton url={shareUrl} quote={property.name} hashtag={`#${property.type.replace(/\s/g, '') }ForRent`}>
          <FacebookIcon size={40} round></FacebookIcon>
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} quote={property.name} hashtag={[`${property.type.replace(/\s/g,'')}ForRent`]}>
          <TwitterIcon size={40} round></TwitterIcon>
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} quote={property.name} separator=':: '>
          <WhatsappIcon size={40} round></WhatsappIcon>
        </WhatsappShareButton>
        <EmailShareButton url={shareUrl} subject={property.name} body={`Check out this property listing:${shareUrl}`}>
          <EmailIcon size={40} round></EmailIcon>
        </EmailShareButton>
      </div>
    </>
  )
}

export default ShareButton
