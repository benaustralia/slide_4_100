import { memo, useEffect } from 'react'
import './SlidePanel.css'

const SlidePanel = memo(function SlidePanel({ title, content, image, imageAlt, imageTitle, imageMetadata, additionalText, color, index }) {

  useEffect(() => {
    if (!imageMetadata) return
    
    const measurements = imageMetadata.measurements
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "VisualArtwork",
      "name": imageMetadata.title || imageTitle || title,
      "image": image,
      ...(imageMetadata.date && { "dateCreated": imageMetadata.date }),
      ...(imageMetadata.medium && { "artMedium": imageMetadata.medium }),
      ...(measurements && {
        "width": { "@type": "Distance", "name": measurements.match(/W\s*(\d+(?:\.\d+)?\s*cm)/i)?.[1] || measurements },
        "height": { "@type": "Distance", "name": measurements.match(/H\s*(\d+(?:\.\d+)?\s*cm)/i)?.[1] || measurements }
      }),
      ...(imageMetadata.accession_number && { "identifier": imageMetadata.accession_number }),
      ...(imageMetadata.acquisition_method && { "acquiredThrough": imageMetadata.acquisition_method }),
      ...(imageMetadata.work_type && { "artform": imageMetadata.work_type })
    }

    const scriptId = `structured-data-${index}`
    let script = document.getElementById(scriptId)
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(structuredData)

    return () => {
      const scriptToRemove = document.getElementById(scriptId)
      if (scriptToRemove) scriptToRemove.remove()
    }
  }, [imageMetadata, imageTitle, title, image, index])
  
  return (
    <section className="slide-panel" style={{ '--panel-color': color }} aria-labelledby={`panel-title-${index}`}>
      <div className="panel-content">
        <h2 id={`panel-title-${index}`} className="panel-title">{title}</h2>
        {image && (
          <div className="panel-image-wrapper">
            <img src={image} alt={imageAlt || ''} title={imageTitle || title} className="panel-image" loading="lazy" decoding="async" width="800" height="450" />
          </div>
        )}
        <div className="panel-text-content">
          <p className="panel-text">{content}</p>
          {additionalText && <p className="panel-additional-text">{additionalText}</p>}
        </div>
        <div className="panel-number" aria-hidden="true">#{index + 1}</div>
      </div>
    </section>
  )
})

export default SlidePanel

