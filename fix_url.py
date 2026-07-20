import re

with open('/Users/hjalmarmeza/Downloads/Antigravity/PROYECTOS_FINALIZADOS/Horizon_hub/src/data/projects.js', 'r') as f:
    content = f.read()

content = content.replace("'https://hjalmarmeza.github.io/RelicLens/'", "'https://relic-lens.vercel.app/'")

with open('/Users/hjalmarmeza/Downloads/Antigravity/PROYECTOS_FINALIZADOS/Horizon_hub/src/data/projects.js', 'w') as f:
    f.write(content)

