import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const expertiseAreas = [
  {
    title: "Сантехника",
    description: "Замена труб, установка смесителей, унитазов, ванн и душевых кабин. Устранение течей и засоров. Монтаж фильтров и водосчётчиков.",
    icon: "Droplets",
  },
  {
    title: "Электрика",
    description:
      "Замена розеток, выключателей и проводки. Установка люстр, бра и точечных светильников. Подключение электроплит и стиральных машин.",
    icon: "Zap",
  },
  {
    title: "Мелкий ремонт",
    description:
      "Сборка мебели, установка карнизов и полок, навеска картин и зеркал. Всё что нужно сделать по дому — быстро и надёжно.",
    icon: "Wrench",
  },
  {
    title: "Срочный выезд",
    description:
      "Прорвало трубу? Выбило пробки? Приеду в течение часа. Работаю без выходных — всегда на связи, всегда готов помочь.",
    icon: "Clock",
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Что я делаю</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Услуги</HighlightedText>, которые
            <br />
            вам нужны
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Решаю любые сантехнические и электрические задачи в квартире или доме. Опыт более 10 лет — справлюсь с любой сложностью.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => {
            return (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon name={area.icon} className="w-10 h-10 mb-4 text-foreground" strokeWidth={1.25} />
                </div>
                <h3 className="text-xl font-medium mb-4">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
