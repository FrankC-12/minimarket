# Mini Marketplace

Proyecto de prueba rápida implementado en **TypeScript + Next.js + Express.js**.
Simula un pequeño marketplace con backend, frontend y un algoritmo utilitario para obtener los productos más baratos disponibles.

---

## 🏗 Tecnologías utilizadas

- **Backend:** Node.js, Express, TypeScript
- **Frontend:** Next.js, React, TypeScript
- **Persistencia:** JSON local (opcional MongoDB)
- **Control de versiones:** Git con ramas feature y Pull Requests
- **UI:** TailwindCSS (maquetación básica, responsive)

---

## 📁 Estructura del proyecto

/api
├─ src/
├─ index.ts
├─ products.router.ts
├─ data/products.json
└─ types.ts
/web
├─ app/
├─ products/page.tsx
└─ products/[id]/page.tsx
├─ components/ProductCard.tsx
└─ lib/api.ts
/shared
└─ types.ts
.gitignore
README.md
package.json
tsconfig.json

yaml
Copy code

---

## ⚡ Scripts disponibles

### Frontend (`/web`)

```bash
npm install
npm run dev       # Levanta el frontend en http://localhost:3000
Backend (/api)
bash
Copy code
npm install
npm run dev       # Levanta el backend en http://localhost:3001
Recomendación: abrir 2 terminales, una para frontend y otra para backend.

🔗 Endpoints disponibles
1. Listado de productos
pgsql
Copy code
GET /api/products?search=&sort=price|name&order=asc|desc&page=1&limit=4&available=true|false
Query Params:

Param	Descripción
search	Filtra por nombre del producto
sort	Ordena por price o name
order	Ascendente asc o descendente desc
page	Número de página
limit	Cantidad de productos por página (default 4)
available	Filtra solo productos disponibles (true/false)

2. Detalle de producto
bash
Copy code
GET /api/products/:id
Ejemplo: /api/products/p1

Retorna JSON con toda la información del producto.

Si no existe, retorna 404 { error: "Product not found" }.

3. Top N productos más baratos disponibles
bash
Copy code
GET /api/products/top-cheap?top=3
Devuelve los N productos más baratos que están en stock (por defecto 3).

🖥 Páginas Frontend
/products
Lista de productos en grid responsive

Buscador por nombre

Sort por precio o nombre

Filtro por disponibilidad

Paginación (4 productos por página)

Sección de Top 3 productos más baratos

/products/[id]
Detalle de producto: imagen grande, título, precio, badge de stock

Botón “Agregar a favoritos” (sin lógica)

💡 Algoritmo utilitario
Función: getTopCheapestAvailable(products, top = 3)

Filtra productos disponibles (isAvailable = true)

Ordena por precio ascendente

Devuelve los N más baratos (default 3)

Implementada en backend /api/products/top-cheap.

🔧 Flujo de trabajo con Git
Ramas feature:

feature/api → Implementar backend → PR a main

feature/web → Implementar frontend → PR a main

Convención de commits:

feat(api): list & detail

feat(web): products page

chore: readme decisions

Pull Requests: revisión y merge a main.

📌 Notas
El backend usa JSON local por simplicidad; se puede reemplazar por MongoDB si se desea persistencia real.

UI básica y funcional, enfocada en claridad y responsividad.

Para producción, construir frontend con npm run build y correr backend en un servidor Node.js.

📥 Instalación rápida
bash
Copy code
# Backend
cd api
npm install
npm run dev      # http://localhost:4000

# Frontend
cd ../web
npm install
npm run dev      # http://localhost:3000