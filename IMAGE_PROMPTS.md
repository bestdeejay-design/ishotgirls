# IMAGE_PROMPTS — ISHOTGIRLS · Field Notes, выпуск №01

Промты для генерации **всех** изображений проекта. Промты — на английском
(язык генераторов), пояснения — на русском. Ниже зафиксирован ровно тот текст,
который использовался для текущих файлов в `img/`, — то есть файл служит и
инструкцией, и журналом воспроизводимости.

---

## 1. Стилевой гайд (обязателен для каждого кадра)

**Смысл проекта:** «Real training, not filtered motivation» — реальные
тренировки вместо отфильтрованного глянца. Никаких постеров, рекламных
кампаний и «до/после».

**Девушки на фото — презентация здоровья и ухоженности:**
- чистая здоровая кожа с естественным румянцем, без макияжа и ретуши;
- аккуратно собранные чистые волосы (хвост/пучок/коса), пара живых прядей допустима;
- тренировочная одежда по размеру, в тонах палитры — «clean and intentional»;
- спокойное сосредоточенное лицо, здоровая осанка: дисциплина читается в теле;
- формула: **real, but put together** — реально, но собрано.

**Визуальный язык:** editorial-документальный стиль, «shot on 35mm», мелкое
плёночное зерно, малая глубина резкости, естественный утренний свет, длинные
мягкие тени, лёгкая дымка/пыль в контровом свете.

**Палитра (токены дизайн-системы):**

| Токен | Hex | Где |
|---|---|---|
| ink | `#0A0A09` | фон тёмной темы, тени |
| ink-2 / ink-3 | `#101010` / `#161614` | карточки, панели |
| bone | `#EFE9DD` | текст тёмной темы, свет |
| olive | `#7C8B5E` / `#9BAA78` | акцент, рамки, бейджи |
| tan | `#C3B394` | вторичные подписи |
| clay | `#8A6A4F` | редкий тёплый акцент |

**Кроп после генерации:** обязательный `cover`-кроп до точного соотношения
блока (композицию не резать), ресайз до целевого размера, экспорт в WebP q=80
(`og-image.png` — PNG, т.к. так в `meta`), затем обновить `width`/`height`
у `<img>` в `index.html`. Всё это делает `tools/build_images.py`.

---

## 2. Реестр персонажей

Все девушки — **разные люди**, возраст 26–32, с зафиксированными отличиями
(типаж, тон кожи, волосы, телосложение). При генерации меняйте seed; в негатив —
`identical twin, same model, repeated face`.

| ID | Файл | Блок | Дисциплина | Типаж | Возраст | Статус |
|----|------|------|-----------|-------|---------|--------|
| H | `hero-main.webp` | Обложка | сила, штанга на плечах | средиземноморка, оливковая кожа, тёмный низкий пучок | 29 | ✅ готово |
| H2 | `hero-inset.webp` | Обложка (деталь) | мел на грифе | без лица — только руки | — | ✅ готово |
| A01 | `roster-01-anna.webp` | Ростер · профиль месяца | Сила | восточноазиатка, тёмный низкий пучок, скуластая | 28 | ✅ готово |
| A02 | `roster-02-maria.webp` | Ростер | Пауэрлифтинг | славянка, светлая с веснушками, каштановые до плеч | 30 | ✅ готово |
| A03 | `roster-03-sofia.webp` | Ростер | ОФП | афро, тёмная кожа, кудри, широкая улыбка | 32 | ✅ готово |
| A04 | `roster-04-olivia.webp` | Ростер | Бег | североевропейка, светлый высокий хвост | 26 | ✅ готово |
| A05 | `roster-05-emma.webp` | Ростер | Питание | латиноамериканка, тёплая смуглая кожа | 27 | ✅ готово |
| A06 | `roster-06-lily.webp` | Ростер | Мобилити | средиземноморка, длинные тёмные волосы | 31 | ✅ готово |
| A07 | `roster-07-nadia.webp` | Ростер | Бокс | Middle East × Brazilian, тёмные кудри косой | 29 | ✅ готово |
| A08 | `roster-08-yuki.webp` | Ростер | Бег (длинные) | японка, светлая тёплая кожа, прямые волосы | 28 | ⏳ к генерации |
| A09 | `roster-09-clara.webp` | Ростер | Плавание | центральноевропейка, светлая, короткая стрижка | 30 | ⏳ к генерации |
| T | `column-train.webp` | Колонка Train | — | короткая тёмная стрижка, худощавая | 28 | ✅ готово |
| F | `column-fuel.webp` | Колонка Fuel | еда, без людей | — | — | ⏳ к генерации |
| R | `column-recover.webp` | Колонка Recover | = A06 (Лили) | средиземноморка | 31 | ⏳ к генерации |
| W | `feature-wide.webp` | Полноэкранная полоса | интерьер, без людей | — | — | ⏳ к генерации |

**Форматы файлов:**

| Файл | Соотношение | Размер | Блок на сайте |
|---|---|---|---|
| `hero-main.webp` | 4:5 | 900×1125 | обложка, правая панель |
| `hero-inset.webp` | 1:1 | 520×520 | врезка-деталь на обложке |
| `roster-*.webp` | 3:4 | 720×960 | карточка ростера |
| `column-*.webp` | 16:10 | 800×500 | карточка колонки |
| `feature-wide.webp` | 21:9 | 1400×600 | полноэкранная полоса с цитатой |
| `og-image.png` | 2:1 | 1280×640 | собирается кодом, не генерируется |

---

## 3. Промты (использованные)

### 3.1 Обложка — H, штанга на плечах · 4:5

```
Editorial documentary fitness photograph, vertical 4:5 portrait frame. A
confident well-groomed woman, 29 years old, Mediterranean type — olive skin,
dark hair pulled back into a low bun, strong defined features, calm steady gaze
slightly off-camera. She is mid-session in an old-school industrial city gym at
dawn, a loaded barbell resting across her back in a squat stance, feet planted,
breathing measured. Fitted charcoal training top and dark moss-olive leggings,
well-fitting quality training clothes. Skin fresh with a light natural flush,
no makeup, no retouch. Industrial windows behind her, soft golden dawn light,
chalk dust hanging in the air, long soft shadows on a worn rubber floor.
Desaturated honest palette: deep warm graphite blacks, bone white, muted olive
green, tan. Shot on 35mm film, fine film grain, shallow depth of field, natural
imperfections. Real, but put together — not glamorous, not a motivational
poster. No text, no logos, no watermark.
```

### 3.2 Врезка обложки — H2, мел на грифе · 1:1

```
Editorial documentary detail photograph, square 1:1 frame. Close-up of an
athlete's hands, a 29-year-old woman, chalky palms gripping the knurled steel of
a loaded barbell in an old-school gym at dawn. Fine chalk dust floating in a
shaft of golden morning light, worn steel bar and matte black weight plates
softly out of focus behind. Warm graphite blacks, bone white, tan, a touch of
muted olive. Skin clean and healthy, short unpolished nails, no jewelry. Shot on
35mm film, fine grain, shallow depth of field, honest documentary realism.
No text, no logos, no watermark.
```

### 3.3 A01 — Анна · Сила · 3:4

```
Editorial documentary fitness photograph, vertical 3:4 portrait frame. A
well-groomed woman, 28 years old, East Asian type — tan skin, dark hair in a low
bun, high cheekbones, a strong defined face. Mid strength-training session in an
old-school industrial city gym at dawn, controlling a barbell overhead press,
standing tall, core braced, focused gaze ahead. Fitted charcoal training top and
dark moss-olive leggings, quality well-fitting training clothes. Skin fresh with
a light natural flush, no makeup. Worn black rubber floor, chalk dust,
industrial windows with soft golden morning light, long shadows. Desaturated
honest palette: deep warm graphite blacks, bone white, muted olive green, tan.
Shot on 35mm film, fine film grain, shallow depth of field. Real, but put
together — not glamorous, not a motivational poster. No text, no logos, no
watermark.
```

### 3.4 A02 — Мария · Пауэрлифтинг · 3:4

```
Editorial documentary fitness photograph, vertical 3:4 portrait frame. A
well-groomed woman, 30 years old, Slavic type — fair skin with light freckles,
chestnut hair to her shoulders tied back, a sturdy athletic build. Powerlifting:
deadlift setup over a loaded barbell with bumper plates, hands chalked, back
flat, quiet concentration, lifting belt, chalk dust in the air. Old-school city
gym at dawn, natural golden morning light through industrial windows, long
shadows, worn rubber floor. Desaturated honest palette: deep warm graphite
blacks, bone white, muted olive green, tan. Shot on 35mm film, fine film grain,
shallow depth of field. Real, but put together — not glamorous, not a
motivational poster. No text, no logos, no watermark.
```

### 3.5 A03 — София · ОФП · 3:4

```
Editorial documentary fitness photograph, vertical 3:4 portrait frame. A
well-groomed woman, 32 years old, of African heritage — deep dark skin, natural
curly black hair, a warm confident expression. Calisthenics, outdoors in a city
park at dawn, hanging from a steel pull-up bar in a controlled hold, arms
engaged, chin up. Fitted dark training top and moss-olive leggings, quality
well-fitting training clothes, clean healthy skin, no makeup. Thin morning mist,
low golden light through bare branches, long soft shadows, dew on the grass.
Desaturated honest palette: deep warm graphite blacks, bone white, muted olive
green, tan. Shot on 35mm film, fine film grain, shallow depth of field. Real, but
put together — not glamorous, not a motivational poster. No text, no logos, no
watermark.
```

### 3.6 A04 — Оливия · Бег · 3:4

```
Editorial documentary fitness photograph, vertical 3:4 portrait frame. A
well-groomed woman, 26 years old, Northern European type — fair porcelain skin,
blonde hair in a high ponytail, fine delicate features. Running at dawn along a
quiet city riverside embankment, mid-stride, breathing steady, gaze forward,
calm and focused. Fitted dark training jacket and moss-olive leggings, quality
well-fitting training clothes, clean healthy skin, no makeup. Soft golden light,
park trees and old street lamps on one side, calm grey river on the other, long
soft shadows, light mist over the water. Desaturated honest palette: deep warm
graphite blacks, bone white, muted olive green, tan. Shot on 35mm film, fine
film grain, shallow depth of field. Real, but put together — not glamorous, not
a motivational poster. No text, no logos, no watermark.
```

### 3.7 A05 — Эмма · Питание · 3:4

```
Editorial documentary lifestyle photograph, vertical 3:4 portrait frame. A
well-groomed woman, 27 years old, Latina type — warm tan skin, dark hair to her
shoulders, soft gentle features, calm expression. Nutrition and meal prep in a
tidy small city apartment kitchen in early morning light: she stands at the
counter filling glass containers with grains, greens and grilled protein, a few
green plants on the windowsill. Fitted dark training top with a clean linen
apron, well-fitting everyday clothes, clean healthy skin, no makeup. Warm window
light, soft shadows, honest domestic realism. Desaturated palette: deep warm
graphite blacks, bone white, muted olive green, tan, natural wood. Shot on 35mm
film, fine film grain, shallow depth of field. Real, but put together — not
glamorous, not an advertisement. No text, no logos, no watermark.
```

### 3.8 A06 — Лили · Мобилити · 3:4

```
Editorial documentary fitness photograph, vertical 3:4 portrait frame. A
well-groomed woman, 31 years old, Mediterranean type — olive skin, long dark
hair, a graceful lean build. Mobility and recovery work in a tidy minimalist home
studio at dawn: seated on a clean mat in a long stretch, spine lengthened, eyes
closed, breath calm. Fitted dark training top and moss-olive leggings, quality
well-fitting training clothes, clean healthy skin, no makeup. Long window light
across a pale wall, soft warm morning haze, minimal props, bare floorboards.
Desaturated honest palette: deep warm graphite blacks, bone white, muted olive
green, tan — quiet. Shot on 35mm film, fine film grain, shallow depth of field.
Real, but put together — not glamorous, not a motivational poster. No text, no
logos, no watermark.
```

### 3.9 A07 — Надия · Бокс · 3:4

```
Editorial documentary fitness photograph, vertical 3:4 portrait frame. A
well-groomed woman, 29 years old, mixed Middle Eastern and Brazilian type — warm
bronzed skin, dark curly hair braided back, strong shoulders, a compact athletic
build. Boxing training in an honest old neighbourhood gym at dawn: she works a
worn heavy bag with taped hands, wrapped wrists, sharp focused eyes, sweat on her
temples. Fitted dark training top and high-waisted moss-olive leggings, quality
well-fitting training clothes. High window with hard golden morning light cutting
through dust, worn canvas bag, long shadows on scuffed floor. Desaturated honest
palette: deep warm graphite blacks, bone white, muted olive green, tan. Shot on
35mm film, fine film grain, shallow depth of field. Real, but put together — not
glamorous, not a motivational poster. No text, no logos, no watermark.
```

### 3.10 Колонка Train — T · 16:10

```
Editorial documentary fitness photograph, wide 16:10 horizontal frame. A
well-groomed woman, 28 years old, light olive skin, short dark cropped hair, slim
athletic frame, in profile — loading weight plates onto a barbell on the floor of
an old-school industrial city gym at dawn. Chalk dust drifts through a shaft of
golden morning light from tall factory windows, worn rubber floor, plates and a
rack softly out of focus behind. Fitted charcoal training top and dark moss-olive
leggings. Desaturated honest palette: deep warm graphite blacks, bone white,
muted olive green, tan. Shot on 35mm film, fine film grain, shallow depth of
field. Real, but put together — quiet documentary realism, no glamour. No text,
no logos, no watermark.
```

---

## 4. Очередь генерации (следующий заход)

Пять кадров, которых пока нет; в вёрстке на их местах — аккуратные
заглушки (ростер A08/A09) либо временные широкие кадры.

### 4.1 A08 — Юки · Бег, длинные · 3:4 → `roster-08-yuki.webp`

```
Editorial documentary fitness photograph, vertical 3:4 portrait frame. A
well-groomed woman, 28 years old, Japanese type — light warm skin, straight dark
hair in a low ponytail, calm precise features. Long-distance running at dawn on
an empty riverside road, mid-stride with relaxed shoulders and quiet breathing,
gaze steady ahead. Fitted dark long-sleeve training top and moss-olive leggings,
quality well-fitting training clothes, clean healthy skin, no makeup. Low golden
light along the water, bare trees, thin mist, long soft shadows. Desaturated
honest palette: deep warm graphite blacks, bone white, muted olive green, tan.
Shot on 35mm film, fine film grain, shallow depth of field. Real, but put
together — not glamorous, not a motivational poster. No text, no logos, no
watermark.
```

### 4.2 A09 — Клара · Плавание · 3:4 → `roster-09-clara.webp`

```
Editorial documentary fitness photograph, vertical 3:4 portrait frame. A
well-groomed woman, 30 years old, Central European type — fair skin, short dark
bob tucked behind the ears, defined swimmer's shoulders. Swimming training in an
old municipal pool early in the morning: standing in the shallow end at the
lane rope, cap and goggles pushed up on her forehead, water running off her
shoulders, calm focused expression. Fitted dark one-piece training swimsuit.
Clean water surface, tiled wall, single skylight with soft golden light, steam
in the air. Desaturated honest palette: deep warm graphite blacks, bone white,
muted olive green, tan. Shot on 35mm film, fine film grain, shallow depth of
field. Real, but put together — not glamorous, not a motivational poster. No
text, no logos, no watermark.
```

### 4.3 Колонка Fuel — еда · 16:10 → `column-fuel.webp`

```
Editorial documentary food photograph, wide 16:10 horizontal frame, overhead
three-quarter view. A clean meal-prep spread on a pale worn wooden table in soft
morning window light: three glass containers of grilled sliced chicken, quinoa,
roasted sweet potato, steamed broccoli and fresh spinach, a drizzle of olive oil,
a few cherry tomatoes; a matte ceramic bowl, a linen napkin, a glass of water, a
small knife and a wooden spoon. No people, no hands. Desaturated honest palette:
bone white, muted olive green, tan, warm wood, deep graphite shadow. Shot on 35mm
film, fine grain, shallow depth of field, natural light and soft shadows. Calm,
real, everyday — not a glossy food advertisement. No text, no logos, no
watermark.
```

### 4.4 Колонка Recover — Лили (та же A06) · 16:10 → `column-recover.webp`

```
Editorial documentary fitness photograph, wide 16:10 horizontal frame. A
well-groomed woman, 31 years old, Mediterranean type — olive skin, long dark
hair, graceful lean build — resting on a clean mat in a tidy minimalist home
studio at dawn after mobility work: reclined over a rolled towel, arms open, eyes
closed, breath slow. Fitted dark training top and moss-olive leggings, clean
healthy skin, no makeup. Long low window light across a pale wall, soft warm
morning haze, minimal props, bare floorboards, a single plant. Desaturated honest
palette: deep warm graphite blacks, bone white, muted olive green, tan — quiet.
Shot on 35mm film, fine film grain, shallow depth of field. Real, but put
together — not romantic, not a motivational poster. No text, no logos, no
watermark.
```

### 4.5 Полоса выпуска — интерьер · 21:9 → `feature-wide.webp`

```
Editorial documentary photograph, very wide 21:9 cinematic horizontal frame.
Interior of an old-school industrial city gym at dawn, empty and quiet before the
session: a loaded barbell on the floor in the foreground, chalk dust hanging in
the air, tall factory windows with soft golden light streaming in long beams
across a worn rubber floor, racks, plates and a wooden lifting platform receding
into shadow. No people. Desaturated honest palette: deep warm graphite blacks,
bone white, muted olive green, tan. Shot on 35mm film, fine film grain,
wide-angle, deep perspective, natural light and long shadows. Quiet and real, not
a glossy fitness advertisement. No text, no logos, no watermark.
```

---

## 5. Негативные промты

Общий (все кадры с людьми):

```
messy hair, unwashed look, oily skin, blemishes, tired eyes, oversized wrinkled
clothes, stains, holes, ill-fitting outfit, heavy makeup, perfect studio skin,
airbrushed, smiling at camera, brand logos, bright colors, poster typography,
crowds, commercial fitness ad, identical twin, same model, repeated face, forest,
wilderness, luxury gym, neon, mirror walls, text, watermark
```

Дополнительно по локациям:
- **зал:** `outdoor nature, treadmill, cardio machines, group fitness class`
- **бег:** `forest trail, mud, mountains, fields, race bib, race photos`
- **воркаут:** `indoor gym, ceiling, treadmill, mountain boulders, climbing holds`
- **кухня:** `gym, workout equipment, messy kitchen, fast food, takeout containers`
- **бассейн:** `open water, beach, diving boards, crowded lanes, sunburn`
- **еда (без людей):** `people, hands, face, overly saturated colors, fast food, plastic containers, messy table, studio lighting, heavy shadows`

---

## 6. Сборка

```bash
# 1. положить мастера (PNG) в raw/ под именами из таблицы выше
# 2. собрать веб-ассеты в img/ (кроп, ресайз, WebP q=80) и og-image.png
python3 tools/build_images.py            # читает ./raw
python3 tools/build_images.py /path/to/masters
# 3. локальный просмотр
python3 server.py
```

`tools/build_images.py` режет по `cover`-правилу (центр / верх), пишет
`img/<name>.webp` и собирает OG-карточку из `hero-main.webp` и токенов
дизайн-системы. Имена и пропорции зафиксированы в `MANIFEST` внутри скрипта —
менять их нужно синхронно с `index.html`.

---

## 7. Хронология

- `img/`, выпуск №01: полный новый фото-сет по этому файлу — обложка,
  врезка, семь профилей ростера, колонка Train; пересобрана OG-карточка
  (1280×640, оливковый акцент, новая типографика).
- Удалены кадры прошлой версии (`athlete-*.webp`, `cover.webp`) — предыдущая
  палитра и «журнальная» сетка заменены дизайн-системой Field Notes.
- Ожидают генерации: A08 (Юки, бег), A09 (Клара, плавание), `column-fuel`,
  `column-recover`, `feature-wide` — на их местах временные кадры/заглушки.
