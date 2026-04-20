import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Как быстро вы приедете?",
    answer:
      "Обычно приезжаю в течение 1–2 часов после звонка. В экстренных случаях — прорыв трубы или отключение электричества — стараюсь приехать ещё быстрее. Работаю без выходных.",
  },
  {
    question: "Сколько стоят ваши услуги?",
    answer:
      "Стоимость зависит от вида и объёма работ. Называю цену до начала работ — никаких сюрпризов. Минимальный выезд от 500 рублей. Можете описать задачу по телефону, и я сориентирую по стоимости.",
  },
  {
    question: "Даёте ли вы гарантию на работу?",
    answer:
      "Да, даю гарантию на все выполненные работы. Если что-то пойдёт не так по моей вине — приеду и исправлю бесплатно. Дорожу репутацией и работаю на результат.",
  },
  {
    question: "Нужно ли мне покупать материалы заранее?",
    answer:
      "Не обязательно. Могу приехать со своими расходными материалами — прокладки, фитинги, провода, розетки. Если нужны специфические детали, обсудим заранее по телефону.",
  },
  {
    question: "В каком районе вы работаете?",
    answer:
      "Работаю по всему городу и ближайшим пригородам. Уточните адрес при звонке — скажу точно, смогу ли приехать и в какое время.",
  },
  {
    question: "Как вызвать мастера?",
    answer:
      "Просто позвоните или напишите в MAX — номер телефона внизу страницы. Опишите задачу, назовите адрес, и мы согласуем удобное время. Работаю с 8:00 до 19:00 без выходных.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}