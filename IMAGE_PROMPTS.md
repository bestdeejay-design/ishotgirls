# IMAGE_PROMPTS — ISHOT · The Training Journal №01

Файл с промтами для генерации ВСЕХ изображений проекта. Промты — на
английском (язык генераторов), пояснения — на русском.

**ВАЖНО — все девушки разные.** Каждая карточка ростера, колонки и обложка
изображают ОТДЕЛЬНОГО человека с уникальным типажем и возрастом 26–32 года.
В промтах ниже зафиксированы отличия (этничность, цвет/длина волос, тон
кожи, черты лица, возраст). При генерации обязательно меняй **seed** между
картинками, иначе модель выдаст одно и то же лицо на всех кадрах. В негатив —
`identical twin, same model, repeated face`.

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
| Фото | Блок | Соотношение | Целевой размер |
|---|---|---|---|
| `cover.webp` | Обложка | 4:5 | 768×960 |
| `og-image.png` | OG-превью | 2:1 | 1280×640 |
| `athlete-*.webp` (6 шт) | Ростер | 3:4 | 768×1024 |
| `column-train.webp` | Колонка Train | 16:10 | 512×320 |
| `column-fuel.webp` | Колонка Fuel (ЕДА) | 16:10 | 512×320 |
| `column-recover.webp` | Колонка Recover | 16:10 | 512×320 |

**Подготовка после генерации:** кроп до точного соотношения блока (не резать
композицию), ресайз до целевого размера, экспорт в WebP q=80 (кроме
`og-image.png` — оставить PNG, т.к. так в meta), обновить `width`/`height` у
`<img>` в `index.html`.

---

## 2. Реестр персонажей (типаж + возраст, все разные)

| ID | Блок | Специализация | Типаж | Возраст |
|----|------|---------------|-------|---------|
| H | Cover / OG | лицо номера | средиземноморка, оливковая кожа, тёмные волосы до плеч, уверенная | 29 |
| A01 | Ростер | Strength | восточноазиатка, смуглая, тёмный низкий пучок, скуластая | 28 |
| A02 | Ростер | Powerlifting | славянка, светлая с веснушками, каштановые до плеч, плотная | 30 |
| A03 | Ростер | Calisthenics | афро, тёмная кожа, кудри, широкая улыбка | 32 |
| A04 | Ростер | Running | североевропейка, светлая, светлый высокий хвост, тонколицая | 26 |
| A05 | Ростер | Nutrition | латиноамериканка, тёплая смуглая, тёмные до плеч, мягкие черты | 27 |
| A06 | Ростер | Mobility | средиземноморка, оливковая кожа, длинные тёмные волосы, грациозная | 31 |
| T | Колонка Train | — | отдельный, короткая тёмная стрижка, худощавая | 28 |
| — | Колонка Recover | — | = A06 (Lily), тот же типаж | 31 |
| — | Колонка Fuel | — | ЕДА, без людей | — |

---

## 3. Промты

### 3.1 Обложка — H (лицо номера), барбелл · 4:5

```
Editorial fitness-journal cover photograph, vertical 4:5. A confident
well-groomed woman, 29 years old, of Mediterranean type — olive skin,
dark hair to her shoulders, strong defined features. She stands in an
old-school city gym at dawn holding a barbell across her shoulders,
steady stance, calm self-assured gaze at the camera. Skin fresh with a
light natural flush, no makeup. She wears a fitted charcoal training top
and dark moss-olive leggings — quality training clothes, clean and
intentional. Industrial windows, soft golden morning light, chalk dust,
long shadows. Palette of deep ink blacks, warm paper ivory, muted olive
green and tan — desaturated, honest. Editorial documentary style, shot on
35mm, fine film grain, shallow depth of field. Not glamorous, not
motivational-poster — real, but put together.
```

### 3.2 OG-превью — СОСТАВНАЯ КАРТОЧКА ИЗ HERO (НЕ кроп фото) · 2:1

OG-превью **не генерируется как отдельное фото**. Оно собирается
программно (Pillow) из элементов hero-секции сайта:

- фон `--ink` `#1B1B18`;
- слева: бренд `ISHOT №01` (Georgia Bold + Italic акцент), подпись
  `THE TRAINING JOURNAL` (JetBrains Mono / Menlo), kicker
  `ISSUE №01 — UNFILTERED · 47 ATHLETES · 214 TRANSFORMATIONS`,
  заголовок `The training / behind the grid.` (вторая строка — акцент,
  italic), sub и строка статистики;
- справа: готовый `cover.webp` как вертикальная панель (cover, центральный
  кроп под ширину панели), с `issue-badge` «ISSUE №01» (зелёный фон, paper)
  и зелёным угловым правилом `.rule`;
- палитра токенов сайта (ink / paper / olive / tan).

Размер 1280×640 (2:1), экспорт в PNG (так в meta `og:image`). Шрифты:
Georgia (serif, фолбэк сайта) + Menlo (mono). Исходник — уже готовый
`cover.webp`, отдельный файл от пользователя не требуется.

```
# сборка: /tmp/og_build.py (Pillow) -> img/og-image.png (1280x640)
```

### 3.3 A01 — Anna · Strength (силовая, зал) · 3:4

```
Editorial fitness-journal photograph, vertical 3:4. A well-groomed woman,
28 years old, of East Asian type — tan skin, dark hair in a low bun,
high cheekbones, a strong defined face. Mid-strength training session in
an old-school city gym at dawn — controlled barbell overhead press,
standing tall, core braced, focused gaze ahead. Skin fresh with a light
natural flush, no makeup. Fitted charcoal training top and dark moss-olive
leggings — quality training clothes, clean and intentional. Worn black
rubber floor, chalk dust, industrial windows with soft morning light, long
shadows. Palette of deep ink blacks, warm paper ivory, muted olive green
and tan — desaturated, honest. Editorial documentary style, shot on 35mm,
fine film grain, shallow depth of field. Not glamorous, not
motivational-poster — real, but put together.
```

### 3.4 A02 — Maria · Powerlifting · 3:4

**Лёгкий промт** (без микроменеджмента позы/гардероба — модель сама
компонует кадр, качество выше):

```
Editorial fitness-journal photograph, vertical 3:4. A well-groomed woman,
30 years old, of Slavic type — fair skin with light freckles, chestnut
hair to her shoulders, a sturdy athletic build. Powerlifting. An
old-school city gym at dawn, natural morning light, chalk dust, long
shadows. Desaturated honest palette: deep ink blacks, warm paper ivory,
muted olive green, tan. Shot on 35mm, fine film grain, shallow depth of
field. Real, but put together — not glamorous, not a motivational poster.
```

### 3.5 A03 — Sofia · Calisthenics · 3:4

**Лёгкий промт:**

```
Editorial fitness-journal photograph, vertical 3:4. A well-groomed woman,
32 years old, of African type — deep dark skin, curly black hair, a wide
warm smile. Calisthenics, outdoor in a city park at dawn — pull-up bars,
thin morning mist, low golden light through branches, long shadows.
Desaturated honest palette: deep ink blacks, warm paper ivory, muted olive
green, tan. Shot on 35mm, fine film grain, shallow depth of field. Real,
but put together — not glamorous, not a motivational poster.
```

### 3.6 A04 — Olivia · Running · 3:4

**Лёгкий промт:**

```
Editorial fitness-journal photograph, vertical 3:4. A well-groomed woman,
26 years old, of Northern European type — fair porcelain skin, blonde hair
in a high ponytail, a fine delicate face. Running at dawn along a city
riverside embankment — soft golden light, park trees and lanterns on one
side, calm river on the other, long soft shadows. Desaturated honest
palette: deep ink blacks, warm paper ivory, muted olive green, tan. Shot
on 35mm, fine film grain, shallow depth of field. Real, but put together —
not glamorous, not a motivational poster.
```

### 3.7 A05 — Emma · Nutrition · 3:4

**Лёгкий промт:**

```
Editorial fitness-journal photograph, vertical 3:4. A well-groomed woman,
27 years old, of Latina type — warm tan skin, dark hair to her shoulders,
soft gentle features. Nutrition, in a tidy city apartment kitchen at
morning light — meal prep, a few plants on the windowsill, warm window
light, soft shadows. Desaturated honest palette: deep ink blacks, warm
paper ivory, muted olive green, tan. Shot on 35mm, fine film grain,
shallow depth of field. Real, but put together — not glamorous, not a
motivational poster.
```

### 3.8 A06 — Lily · Mobility · 3:4

**Лёгкий промт:**

```
Editorial fitness-journal photograph, vertical 3:4. A well-groomed woman,
31 years old, of Mediterranean type — olive skin, long dark hair, a
graceful lean build. Mobility, in a tidy minimalist home studio at dawn —
clean mat, long window light, soft warm morning haze. Desaturated honest
palette: deep ink blacks, warm paper ivory, muted olive green, tan —
quiet. Shot on 35mm, fine film grain, shallow depth of field. Real, but
put together — not glamorous, not a motivational poster.
```

### 3.9 Колонка Train — T (отдельный типаж, зал) · 16:10

**Лёгкий промт:**

```
Editorial fitness-journal photograph, wide 16:10. A well-groomed woman,
28 years old, of a distinct type — light olive skin, short dark cropped
hair, a slim athletic frame. Training in an old-school city gym at dawn,
barbell and weight plates, chalk dust, industrial windows, long shadows.
Desaturated honest palette: deep ink blacks, warm paper ivory, muted olive
green, tan. Shot on 35mm, fine film grain, shallow depth of field. Real,
but put together — not glamorous, not a motivational poster.
```

### 3.10 Колонка Fuel — ЕДА (meal-prep bowl) · 16:10

**Никаких людей.** Только еда в стиле журнальной съёмки.

```
Editorial food photograph, wide 16:10. A clean meal-prep bowl on a light
wooden surface, photographed at soft morning window light. Grilled
chicken breast sliced, quinoa, roasted sweet potato, steamed broccoli and
fresh spinach, a drizzle of olive oil, a few cherry tomatoes. Matte
ceramic bowl, a linen napkin beside it, a glass of water. Desaturated,
honest palette of warm paper ivory, muted olive green, tan and ink —
natural tones, no oversaturated colors. Editorial documentary food style,
shot on 35mm, fine grain, shallow depth of field, calm and real. Not a
glossy ad — a real day's prep.
```

### 3.11 Колонка Recover — = A06 (Lily, растяжка) · 16:10

Тот же типаж, что у A06 (Lily, 31, средиземноморка) — колонка продолжает
её же историю мобильности.

```
Editorial fitness-journal photograph, wide 16:10. A well-groomed woman,
31 years old, of Mediterranean type — olive skin, long dark hair, graceful
lean build. Mobility and recovery, on a clean mat in a tidy minimalist home
studio at dawn — long window light, soft warm morning haze. Desaturated
honest palette: deep ink blacks, warm paper ivory, muted olive green, tan
— quiet. Shot on 35mm, fine film grain, shallow depth of field. Real, but
put together — not glamorous, not a motivational poster.
```

---

## 4. Негативные промты

Общий (все фото с девушками):
```
messy hair, unwashed look, oily skin, blemishes, tired eyes, oversized
wrinkled clothes, stains, holes, ill-fitting outfit, heavy makeup, perfect
studio skin, airbrushed, smiling at camera, brand logos, bright colors,
poster typography, crowds, commercial fitness ad, identical twin, same
model, repeated face, forest, wilderness, luxury gym, neon, mirror walls
```

Для зала (3.1, 3.3, 3.4, 3.9) дополнительно:
```
outdoor nature, treadmill, cardio machines, group fitness class
```

Для бега (3.6) дополнительно:
```
forest, trail in z woods, mud, mountains, fields, race bib, race photos
```

Для воркаута (3.5) дополнительно:
```
indoor gym, ceiling, treadmill, mountain boulders, climbing holds
```

Для кухни (3.7) дополнительно:
```
gym, workout equipment, messy kitchen, fast food, takeout containers
```

Для еды (3.10) отдельный:
```
people, hands, face, overly saturated colors, fast food, plastic containers,
messy table, studio lighting, heavy shadows
```

---

## 5. Хронология

- `column-recover.webp` — заменён, нативный 16:10, 512×320 (коммит `66ce833`)
- `athlete-olivia-v2.webp` — заменён, нативный 3:4, 768×1024 (коммит `2020b71`)
- `athlete-anna.webp`, `athlete-maria.webp` — заменены, нативный 3:4
  (коммит `3724685`)
- `athlete-sofia.webp` — заменён, нативный 3:4 (коммит `d425beb`)
- **Все остальные (cover, og-image, emma, lily, column-train, column-fuel)
   — готовятся к полной перегенерации по промтам выше (разные типажи,
   возраст 26–32)**
- `og-image.png` — собран как составная карточка из hero (Pillow, 1280×640),
  источник `cover.webp`; мета `og:image:width/height` в `index.html`
  обновлена на 1280/640
