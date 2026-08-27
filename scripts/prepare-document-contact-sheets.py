from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path("/home/ubuntu/webdev-static-assets/robin-project-documents")
OUTPUT = Path("/home/ubuntu/robin-courte-3d-workbench/.artifacts/project-document-contact-sheets")
PROJECTS = ("drone", "identite", "phone", "photo")


def fit(image: Image.Image, box: tuple[int, int]) -> Image.Image:
    copy = image.convert("RGB")
    copy.thumbnail(box, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", box, "#efe7d8")
    x = (box[0] - copy.width) // 2
    y = (box[1] - copy.height) // 2
    canvas.paste(copy, (x, y))
    return canvas


def dimensions(image_path: Path) -> tuple[int, int]:
    with Image.open(image_path) as image:
        return image.size


def create_sheet(project: str) -> None:
    files = sorted((ROOT / project).glob("*"))
    thumb_box = (270, 190)
    padding = 28
    label_height = 54
    columns = 3
    rows = max(1, (len(files) + columns - 1) // columns)
    sheet = Image.new(
        "RGB",
        (padding * 2 + columns * thumb_box[0], 70 + padding + rows * (thumb_box[1] + label_height + padding)),
        "#171612",
    )
    draw = ImageDraw.Draw(sheet)
    title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 23)
    label_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 12)
    draw.text((padding, 22), project.upper(), fill="#f2e9d8", font=title_font)

    metadata: list[str] = [f"# {project}", ""]
    for index, path in enumerate(files):
        col = index % columns
        row = index // columns
        x = padding + col * thumb_box[0]
        y = 70 + padding + row * (thumb_box[1] + label_height + padding)
        try:
            with Image.open(path) as image:
                width, height = image.size
                sheet.paste(fit(image, thumb_box), (x, y))
        except Exception as error:
            width, height = 0, 0
            draw.rectangle((x, y, x + thumb_box[0], y + thumb_box[1]), outline="#e95a2c", width=3)
            draw.text((x + 12, y + 12), "Prévisualisation indisponible", fill="#f2e9d8", font=label_font)
            metadata.append(f"- {path.name}: erreur {error}")
            continue
        draw.rectangle((x, y, x + thumb_box[0], y + thumb_box[1]), outline="#f2e9d8", width=2)
        draw.text((x, y + thumb_box[1] + 8), path.name[:34], fill="#f2e9d8", font=label_font)
        draw.text((x, y + thumb_box[1] + 25), f"{width} × {height}", fill="#c9bdac", font=label_font)
        metadata.append(f"- {path.name}: {width} × {height}")

    OUTPUT.mkdir(parents=True, exist_ok=True)
    sheet.save(OUTPUT / f"{project}.jpg", quality=88, optimize=True)
    (OUTPUT / f"{project}.md").write_text("\n".join(metadata) + "\n", encoding="utf-8")


for project_name in PROJECTS:
    create_sheet(project_name)
