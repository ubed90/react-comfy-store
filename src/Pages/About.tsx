import React from 'react'

const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-light sm:text-6xl">
          We Love
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              comfy
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto text-justify">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At saepe
        deserunt deleniti sequi voluptates, nobis cupiditate expedita qui
        reprehenderit. Id sed tenetur accusantium maxime vero, exercitationem
        praesentium ut? Alias impedit ea quia reprehenderit possimus labore quas
        nesciunt fugit, atque eum!
      </p>
    </>
  )
}

export default About
