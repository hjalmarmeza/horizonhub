import re

with open('/Users/hjalmarmeza/Downloads/Antigravity/PROYECTOS_FINALIZADOS/Horizon_hub/src/data/projects.js', 'r') as f:
    content = f.read()

new_project = """export const projects = [
  {
    id: 'reliclens',
    name: 'RelicLens',
    tag: 'Tasación de Antigüedades IA',
    url: 'https://hjalmarmeza.github.io/RelicLens/',
    image: 'logos_opt/reliclens.jpg',
    featured: true
  },"""

content = content.replace("export const projects = [", new_project)

with open('/Users/hjalmarmeza/Downloads/Antigravity/PROYECTOS_FINALIZADOS/Horizon_hub/src/data/projects.js', 'w') as f:
    f.write(content)

