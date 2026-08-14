# IMAGE_PROMPTS — ISHOT · The Training Journal №01

Файл с промтами для генерации изображений проекта. Промты — на английском
(язык генераторов), пояснения — на русском.

---

## 1. Стилевой гайд проекта (обязателен для каждой картинки)

**Смысл проекта (манифест):**
> «A feed of real training, **not filtered motivation**» — реальные тренировки,
> а не отфильтрованный глянец. Никаких постеров и рекламных кампаний.

**Девушки на фото — презентация здоровья и ухоженности:**
- Чистая, здоровая кожа с естественным румянцем, без макияжа и ретуши
- Аккуратно собранные чистые волосы (хвост/пучок), пара живых прядей допустима
- Опрятная качественная тренировочная одежда в тонах палитры — подобранная по
  размеру, «clean and intentional»; никаких мешковатых/заношенных вещей
- Спокойное сосредоточенное лицо, здоровая осанка, дисциплина читается в теле
- Итоговая формула: **real, but put together** — реально, но собрано

**Визуальный язык:**
- Editorial-документальный стиль, «shot on 35mm», лёгкое плёночное зерно,
  малая глубина резкости
- Палитра (токены сайта): чернила `#1B1B18`, бумага `#F2EEE5`,
  приглушённый зелёный `#2E4A33` / `#6C7F6C`, хаки `#B7A98A`
- Свет: естественный (рассвет/утро), длинные мягкие тени, лёгкая дымка
- Настроение: тихая сосредоточенность, честность, никакой показной мотивации

**Форматы картинок на сайте:**
| Блок | Соотношение | Рекомендуемый размер |
|---|---|---|
| Roster-карточки (`.card img`) | 3:4 | 768×1024 (текущие квадраты режутся браузером) |
| Колонки (`.col img`) | 16:10 | 512×320 |
| Обложка (`.cover-fig img`) | 4:5 | 764×1024 |

**Подготовка после генерации:** кроп до точного соотношения блока (не резать
композицию), ресайз до целевого размера, экспорт в WebP (q=80), обновить
`width`/`height` у `<img>` в `index.html`.

---

## 2. Промты

### 2.1 Column 03 — Recover (йога-растяжка) · 16:10 · ✅ в продакшене

```
Editorial fitness-journal photograph, 16:10. A well-groomed young
woman in her mid-20s mid-yoga stretch on a clean mat in a tidy, minimalist
home studio at dawn — seated forward fold, spine long and aligned, hands
resting on her shins. Eyes closed, face serene with a healthy natural
glow — skin clear and fresh, light rosy flush, no makeup, no shine. Hair
pulled back in a neat low ponytail, a few loose strands, freshly clean.
She wears a fitted, softly worn-in charcoal crop top and matching dark
moss-olive leggings that fit her well — quality training clothes in muted
tones, clean and intentional, not a brand campaign. Long window light from
the left wraps her silhouette, soft warm morning haze in the air. Palette
of deep ink blacks, warm paper ivory, muted olive green and tan —
desaturated, honest, quiet. Editorial documentary style, shot on 35mm,
fine film grain, shallow depth of field. She looks healthy, taken care of,
disciplined — the calm strength of a rest day. Not glamorous, not
motivational-poster — real, but put together.
```

Негатив: см. раздел 3, общий.

---

### 2.2 A04 — Olivia · Morning run (утренняя пробежка в городе) · 3:4 · ✅ в продакшене

Все девушки ростера — городские: локация — сквер или набережная, не лес.

```
Editorial fitness-journal photograph, vertical 3:4. A well-groomed young
woman running at dawn along a riverside embankment promenade in the city —
mid-stride, natural running form, arms relaxed, gaze ahead on the path.
She looks healthy and taken care of: skin fresh with a light natural
flush, hair in a clean high ponytail, a few loose strands in the morning
air. She wears a fitted moisture-wicking top in muted olive and dark
charcoal running shorts — quality training clothes, clean and intentional,
not a brand campaign. Soft golden morning light, city park trees and neat
lanterns on one side, calm river water on the other, long soft shadows on
the pavement. Palette of deep ink blacks, warm paper ivory, muted olive
green and tan — desaturated, honest, quiet. Editorial documentary style,
shot on 35mm, fine film grain, shallow depth of field, sense of real
effort and calm focus. Not glamorous, not motivational-poster — real, but
put together.
```

Дополнение под руку (опционально): `quiet city park path instead, benches
and trimmed hedges, early morning, almost no people`.

---

### 2.3 A01 — Anna · Strength (силовая тренировка) · 3:4 · ✅ в продакшене

Локация — скромный городской зал (old-school), никакого глянцевого
фитнес-клуба.

```
Editorial fitness-journal photograph, vertical 3:4. A well-groomed young
woman mid-strength training session in an old-school city gym at dawn —
performing a controlled barbell overhead press, standing tall, core
braced, gaze focused straight ahead. She looks healthy and taken care of:
skin fresh with a light natural flush, hair in a clean tight ponytail, no
makeup. She wears a fitted charcoal training top and dark moss-olive
leggings — quality training clothes, clean and intentional, not a brand
campaign. Quiet raw gym: worn black rubber floor, chalk dust in the air,
industrial windows letting in soft morning light, long shadows across the
platform. Palette of deep ink blacks, warm paper ivory, muted olive green
and tan — desaturated, honest, quiet. Editorial documentary style, shot on
35mm, fine film grain, shallow depth of field, real effort and calm focus.
Not glamorous, not motivational-poster — real, but put together.
```

---

### 2.4 A02 — Maria · Powerlifting (становая тяга) · 3:4 · ✅ в продакшене

Локация — тот же скромный городской зал.

```
Editorial fitness-journal photograph, vertical 3:4. A well-groomed young
woman performing a deadlift in an old-school city gym at dawn — standing
over the barbell, back flat, arms straight, just before the pull, eyes
down on the bar. She looks healthy and taken care of: skin fresh with a
light natural flush, hair in a clean tight ponytail, no makeup. She wears
a fitted charcoal training top and dark moss-olive leggings — quality
training clothes, clean and intentional, not a brand campaign. Loaded
barbell with black iron plates on a worn rubber platform, chalk dust in
the air, industrial windows with soft morning light, long shadows. Palette
of deep ink blacks, warm paper ivory, muted olive green and tan —
desaturated, honest, quiet. Editorial documentary style, shot on 35mm,
fine film grain, shallow depth of field, real effort and calm focus. Not
glamorous, not motivational-poster — real, but put together.
```

---

## 3. Негативные промты

Общий:
```
messy hair, unwashed look, oily skin, blemishes, tired eyes, oversized
wrinkled clothes, stains, holes, ill-fitting outfit, heavy makeup, perfect
studio skin, airbrushed, smiling at camera, brand logos, bright colors,
poster typography, crowds, commercial fitness ad
```

Для бега (2.2) дополнительно:
```
forest, wilderness, trail in the woods, mud, dirt road, mountains, fields,
treadmill, race bib number, race photos, grimacing
```

Для зала (2.3, 2.4) дополнительно:
```
neon lights, mirror walls, luxury gym, glamour, outdoor nature, forest,
wilderness, cardio machines, group fitness class
```

---

## 4. Хронология

- `column-recover.webp` — v1 (квадрат, центральный кроп) → **v2 (нативный 16:10,
  512×320, композиция сохранена)** — коммиты `4290e9a`, `66ce833`
- `athlete-olivia-v2.webp` — **заменён на пользовательское фото городской
  пробежки (нативный 3:4, 768×1024)** — коммит `2020b71`
- `athlete-anna.webp`, `athlete-maria.webp` — **заменены на пользовательские фото
  городского зала (нативный 3:4, 768×1024)** — коммит `3724685`
