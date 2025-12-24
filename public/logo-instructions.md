# Export `logo.svg` to PNG

This file explains simple ways to create PNG versions of `public/logo.svg` for use in the app.

Recommended sizes: 512×512, 256×256, 128×128.

Inkscape (recommended for best fidelity):

```bash
# export 512x512 PNG
inkscape public/logo.svg --export-type=png --export-filename=public/logo-512.png --export-width=512 --export-height=512

# export 256x256
inkscape public/logo.svg --export-type=png --export-filename=public/logo-256.png --export-width=256 --export-height=256
```

ImageMagick `convert`:

```bash
convert -background none public/logo.svg -resize 512x512 public/logo-512.png
```

librsvg `rsvg-convert`:

```bash
rsvg-convert -w 512 -h 512 -o public/logo-512.png public/logo.svg
```

Notes:

- Use `--export-background-opacity=0` (Inkscape 1.2+) or `-background none` (ImageMagick) to keep transparency.
- After exporting, place the generated PNG files in `public/` and reference them from the app where a raster image is required.
