# 🌳 BST Visualizer — Technical Challenge

> Herramientas de Empleabilidad · Prueba Técnica Práctica

---

## Objetivo

Recibirás un proyecto React **intencionalmente roto e incompleto**. Tu misión es diagnosticar, corregir y extender el código como lo haría un desarrollador profesional en un entorno real.

**No se evalúa solo que funcione. Se evalúa cómo llegas a que funcione.**

---

## Stack Tecnológico

| Herramienta | Uso |
|---|---|
| React 18 | Framework UI |
| react-d3-tree | Visualización del árbol |
| Vite | Build tool |
| Vitest | Testing |

---

## Setup

```bash
npm install
npm run dev        # Servidor de desarrollo
npm run test       # Tests unitarios
npm run test:ui    # UI de Vitest en el navegador
```

---

## Tu Misión (en orden de prioridad)

### 🔴 Nivel 1 — Bug Fixing (Obligatorio)

Hay **6 bugs intencionales** distribuidos en `src/utils/bst.js` y `src/components/BSTVisualizer.jsx`. Están marcados con comentarios `// BUG`.

Encuentra cada uno, corrígelo, y documenta en tu PR qué era el bug y por qué tu corrección es la correcta.

**Pista:** Inserta los valores `10, 5, 15, 3, 7` y observa el árbol. ¿Luce correcto?

### 🟡 Nivel 2 — Implementación (Obligatorio)

Completa las funciones marcadas con `// TODO` en `src/utils/bst.js`:

- `inOrder(node)` → Retorna array con recorrido In-Order
- `preOrder(node)` → Retorna array con recorrido Pre-Order  
- `postOrder(node)` → Retorna array con recorrido Post-Order
- `getHeight(node)` → Retorna la altura del árbol

### 🟢 Nivel 3 — Features (Obligatorio)

En `BSTVisualizer.jsx`:

- [ ] Los nodos que coincidan con el resultado de búsqueda deben **resaltarse visualmente** (color diferente en el círculo del nodo).
- [ ] El campo de inserción debe mostrar un **mensaje de error** si el usuario intenta insertar un valor no numérico.

### 🔵 Nivel 4 — Performance (Diferenciador)

Identifica y corrige los dos problemas de rendimiento usando los hooks correctos de React. Justifica tu elección en los comentarios del código.

---

## Criterios de Evaluación

| Criterio | Peso |
|---|---|
| Corrección algorítmica (BST real + edge cases) | 30% |
| Calidad del código (funciones puras, nombres claros) | 20% |
| React bien usado (inmutabilidad, memoización) | 20% |
| Git workflow (commits atómicos, PR description) | 15% |
| Documentación (JSDoc, README actualizado) | 10% |
| Tests (al menos 5 casos cubriendo edge cases) | 5% |

---

## Flujo de Trabajo Esperado (Git)

```
main
└── feature/fix-insert-bug
└── feature/implement-traversals
└── feature/node-highlight
└── feature/performance-optimization
```

Cada rama debe tener al menos **un commit atómico** con mensaje semántico:

```
fix: correct insert to place smaller values on left subtree
feat: implement in-order, pre-order and post-order traversals
fix: resolve toD3Format bug for right-only child nodes
perf: memoize traversal computation with useMemo
```

---

## Uso de Inteligencia Artificial

**Está permitido y es esperado** que uses herramientas de IA (Claude, Cursor, Copilot, etc.).

Sin embargo, serás evaluado en tu **capacidad de auditar la IA**:

- ¿Qué te generó el agente?
- ¿Qué modificaste y por qué?
- ¿Qué rechazaste y por qué era incorrecto?

En tu PR, incluye una sección `## AI Usage` donde describas esto. Un estudiante que usó IA ciegamente y no puede explicar su propio código no aprueba.

---

## Entrega

1. Haz fork del repositorio
2. Trabaja en tus ramas de feature
3. Abre un Pull Request a `main` con descripción completa
4. El PR debe incluir capturas del árbol funcionando correctamente con los valores `10, 5, 15, 3, 7, 12, 20`

**Deadline:** Ver Campus Virtual

---

## Recursos

- [react-d3-tree docs](https://bkrem.github.io/react-d3-tree/)
- [Visualización de BST (referencia visual)](https://visualgo.net/en/bst)
- [React useMemo](https://react.dev/reference/react/useMemo)
- [Conventional Commits](https://www.conventionalcommits.org/)

  ENLACE AL VIDEO
  https://youtu.be/jwtDfz7odn8
