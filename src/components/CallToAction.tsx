import { useState } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import { HighlightedText } from "./HighlightedText"
import func2url from "../../backend/func2url.json"

export function CallToAction() {
  const [form, setForm] = useState({ name: "", phone: "", description: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch(func2url["submit-order"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess(true)
        setForm({ name: "", phone: "", description: "" })
      } else {
        setError(data.error || "Ошибка при отправке")
      }
    } catch {
      setError("Не удалось отправить. Попробуйте позвонить.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-32 md:py-29 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Вызвать мастера</p>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
            Нужна помощь
            <br />
            прямо <HighlightedText>сейчас</HighlightedText>?
          </h2>

          <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Оставьте заявку — перезвоню в течение 15 минут. Работаю без выходных с 8:00 до 22:00.
          </p>

          {success ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <CheckCircle className="w-14 h-14 text-blue-300" strokeWidth={1.5} />
              <p className="text-xl font-medium">Заявка принята!</p>
              <p className="text-primary-foreground/70">Перезвоню вам в ближайшее время.</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 text-sm underline underline-offset-4 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                Оставить ещё одну заявку
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col gap-4 mb-10">
              <input
                type="text"
                placeholder="Ваше имя"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-5 py-4 bg-white/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/40 focus:outline-none focus:border-primary-foreground/60 transition-colors"
              />
              <input
                type="tel"
                placeholder="Номер телефона"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="w-full px-5 py-4 bg-white/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/40 focus:outline-none focus:border-primary-foreground/60 transition-colors"
              />
              <textarea
                placeholder="Опишите задачу (необязательно)"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-5 py-4 bg-white/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/40 focus:outline-none focus:border-primary-foreground/60 transition-colors resize-none"
              />
              {error && <p className="text-red-300 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300 group disabled:opacity-60"
              >
                {loading ? "Отправляю..." : "Оставить заявку"}
                {!loading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </button>
            </form>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+79780661315"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300"
            >
              Позвонить: +7 (978) 066-13-15
            </a>
            <a
              href="https://t.me/master_na_chas"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
