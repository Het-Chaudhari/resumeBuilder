import React from 'react'

function SectionHeading({ title }) {
  return (
    <div>
      <h2 className="text-left">
        {title.split('').map((char, index) => (
          <span
            key={index}
            className={char.toUpperCase() === char && /[A-Z]/.test(char) ? 'text-[1.05rem]' : 'text-[0.8rem]'}
          >
            {char.toUpperCase()}
          </span>
        ))}
      </h2>
      <hr className="border-black mb-1" />
    </div>
  )
}

export default SectionHeading