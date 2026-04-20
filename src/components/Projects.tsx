import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Замена всей сантехники",
    category: "Сантехника",
    location: "Квартира 65 м²",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/a460b857-ca2a-41e7-9c58-4ae01dcaef35/files/2b27a2f7-c741-420a-8a9f-069d4ab4989d.jpg",
  },
  {
    id: 2,
    title: "Разводка электрики",
    category: "Электрика",
    location: "Частный дом",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/a460b857-ca2a-41e7-9c58-4ae01dcaef35/files/2f5e071a-49eb-44d3-82fd-d81822d344b9.jpg",
  },
  {
    id: 3,
    title: "Установка ванной комнаты",
    category: "Сантехника",
    location: "Квартира после ремонта",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/a460b857-ca2a-41e7-9c58-4ae01dcaef35/files/cc972530-fe51-4c6e-b7fb-790cb733816d.jpg",
  },
  {
    id: 4,
    title: "Монтаж освещения",
    category: "Электрика",
    location: "Офис 120 м²",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/a460b857-ca2a-41e7-9c58-4ae01dcaef35/files/f62e4824-13d7-468f-84b8-e1f0c01a6465.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Выполненные работы</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Мои проекты</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Заказать работу
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-muted-foreground/60 text-sm">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}