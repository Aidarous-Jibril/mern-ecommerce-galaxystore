import React from 'react'
import { Helmet } from 'react-helmet'

const ReactHelmet = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

ReactHelmet.defaultProps = {
    title: 'Välkommen till Galaxy Store',
    description: "Hos oss hittar du samma varor som på andra varuhus. Enda skillnaden är att det är lägre priser hos oss!",
    keywords: "billiga  elektronik & kläder ",
}

export default ReactHelmet