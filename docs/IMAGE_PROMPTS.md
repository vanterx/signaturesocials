# Signature Socials — Midjourney Image Prompts

> Generate these in order. Each image replaces a gradient placeholder in the site.
> All images go under `public/images/{section}/`. After generating, save as .jpg/.webp
> and reference the path in the component that uses it.

---

## 1. Home — Hero Background

**File:** `public/images/hero/hero-dancefloor.jpg`
**Aspect:** `--ar 16:9`
**Slot:** Full-viewport hero background, dark overlay on top

**Prompt:**
```
Wide shot of a packed nightclub dancefloor, electronic music event, purple and electric cyan laser beams cutting through thick haze, silhouetted crowd with hands in the air, DJ booth glowing in background with magenta and purple LED panels, moody atmospheric lighting, shallow depth of field, misty smoke layer at knee height, cinematic photography style, ultra-detailed, rich blacks, contrasty, shot on Sony A7S III, high ISO grain --ar 16:9 --style raw --v 6
```

---

## 2. Experiences — Spellbound

**File:** `public/images/experiences/spellbound.jpg`
**Aspect:** `--ar 4:3`
**Slot:** Large card image, left/right alternating layout

**Prompt:**
```
Immersive psychedelic nightclub scene, hypnotic purple and magenta swirling light patterns on walls and ceiling, dancers in silhouette bathed in colored light, fog machines creating layered atmospheric haze, abstract geometric projections mapping onto curved surfaces, dreamlike and otherworldly atmosphere, rich deep blacks with vibrant purple highlights, medium shot of crowd looking up at visual projections, ethereal and hypnotic mood, fine art nightlife photography --ar 4:3 --style raw --v 6
```

---

## 3. Experiences — Anti Social

**File:** `public/images/experiences/anti-social.jpg`
**Aspect:** `--ar 4:3`
**Slot:** Large card image, alternating layout

**Prompt:**
```
Raw underground warehouse rave, dark and gritty atmosphere, single red and deep purple light source from above, silhouette figures in an intimate concrete space, smoke haze hugging the floor, minimal lighting with harsh shadows, industrial setting with exposed brick and pipes, close-up of a DJ's hands on turntables in foreground, crowd of 20-30 people in deep shadow, monochrome with subtle color wash, grainy film texture, documentary style nightlife photography --ar 4:3 --style raw --v 6
```

---

## 4. Experiences — Bass Ritual

**File:** `public/images/experiences/bass-ritual.jpg`
**Aspect:** `--ar 4:3`
**Slot:** Large card image, alternating layout

**Prompt:**
```
Deep bass music event, low-angle shot looking up at towering speaker stacks glowing with deep blue and cyan LED accents, crowd silhouetted against the stage lighting, thick bass haze and fog creating light beams in the air, someone's hand in foreground reaching toward the sound system, powerful visceral atmosphere, deep indigo and electric blue color palette, motion blur suggesting heavy bass vibration, cinematic wide lens, high contrast nightlife photography --ar 4:3 --style raw --v 6
```

---

## 5. Experiences — Back In The Day

**File:** `public/images/experiences/back-in-the-day.jpg`
**Aspect:** `--ar 4:3`
**Slot:** Large card image, alternating layout

**Prompt:**
```
Nostalgic dancefloor scene, classic rave atmosphere, warm amber and gold lighting mixing with purple, disco ball throwing light specks across a packed dancefloor, diverse crowd of all ages smiling and dancing, retro LED screen walls with classic rave visuals, confetti in the air, joyful euphoric expressions, warm golden hour-style lighting contrast against cool purple accents, slightly desaturated with warm tones dominant, celebratory and timeless feel, documentary style event photography --ar 4:3 --style raw --v 6
```

---

## 6. About — Story Section

**File:** `public/images/about/about-dj-booth.jpg`
**Aspect:** `--ar 1:1`
**Slot:** Square image next to the story text

**Prompt:**
```
Close-up of a DJ booth at a New Zealand nightclub, professional DJ working CDJs and mixer, purple and cyan LED strip lighting on the booth edges, smoke swirling around the decks, shallow depth of field with turntable in sharp focus and crowd blurred in background, Pioneer DJ equipment glowing with small blue and white LEDs, hands on mixer faders and EQ knobs, intimate backstage perspective, rich blacks, neon purple rim light on the DJ silhouette, ultra-detailed texture of vinyl and mixer, nightlife portrait photography --ar 1:1 --style raw --v 6
```

---

## 7. About — Community / Crowd

**File:** `public/images/about/about-community.jpg`
**Aspect:** `--ar 16:9`
**Slot:** Full-width background or accent banner

**Prompt:**
```
Crowd shot at an electronic music event in New Zealand, wide angle view from the stage looking out at hundreds of people with hands raised, vibrant purple and cyan stage lighting illuminating smiling faces, laser beams crisscrossing above the crowd, confetti or pyro sparks in the air, diverse crowd of music lovers united in celebration, euphoric energy, warm skin tones contrasting with cool colored stage lights, feeling of community and belonging, high energy peak moment, event photography style --ar 16:9 --style raw --v 6
```

---

## 8. Bonus — Nav / Logo background texture (optional)

**File:** `public/images/hero/bg-texture.jpg`
**Aspect:** `--ar 16:9`
**Slot:** Subtle background texture for nav overlay or section dividers

**Prompt:**
```
Abstract close-up of purple and black fabric texture with subtle magenta thread woven through, deep rich midnight tones, slight sheen catching light, macro photography style, moody dark aesthetic, seamless-looking texture, no recognizable objects or figures, pure abstract dark luxury fabric, ultra high detail --ar 16:9 --v 6
```

---

## Naming Convention

```
public/images/
├── hero/
│   ├── hero-dancefloor.jpg     (Home hero background)
│   └── bg-texture.jpg          (optional texture overlay)
├── experiences/
│   ├── spellbound.jpg
│   ├── anti-social.jpg
│   ├── bass-ritual.jpg
│   └── back-in-the-day.jpg
└── about/
    ├── about-dj-booth.jpg      (story section square image)
    └── about-community.jpg     (community banner)
```

## After Generation

1. Place files in the correct subdirectory under `public/images/`
2. Optimise: convert to .webp at 80% quality for web (or keep as high-res .jpg and let next/image handle optimisation)
3. Update the component to import/reference the image path instead of the gradient placeholder
4. Recommended max dimensions: 2400px on longest side for hero images, 1600px for card images
