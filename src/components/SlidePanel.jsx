import { memo } from 'react'
import './SlidePanel.css'

const SlidePanel = memo(function SlidePanel({ title, content, color, index }) {
  // Set initial transform based on panel index to avoid flash of unstyled content
  const initialTransform = index % 2 === 0 
    ? { transform: 'translateX(-100vw)', opacity: 0 }
    : { transform: 'translateX(100vw)', opacity: 0 }
  
  return (
    <div 
      className="slide-panel"
      style={{ 
        '--panel-color': color,
        ...initialTransform
      }}
    >
      <div className="panel-content">
        <h2 className="panel-title">{title}</h2>
        <p className="panel-text">{content}</p>
        <div className="panel-number">#{index + 1}</div>
      </div>
    </div>
  )
})

export default SlidePanel

