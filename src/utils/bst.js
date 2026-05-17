/**
 * Binary Search Tree - Core Data Structure
 *
 * ⚠️  NOTA PARA EL ESTUDIANTE:
 * Este archivo contiene la lógica central del BST.
 * Hay errores intencionales que debes encontrar y corregir.
 * Lee cada función con cuidado antes de modificar.
 */

// ─── Node Factory ────────────────────────────────────────────────────────────

/**
 * Crea un nodo para el BST.
 * @param {number} value
 * @returns {{ value: number, left: null, right: null }}
 */
export const createNode = (value) => ({
  value,
  left: null,
  right: null,
});

// ─── Core Operations ─────────────────────────────────────────────────────────

/**
 * Inserta un valor en el árbol.
 * 
 * BUG #1: Esta función siempre inserta a la derecha.
 * BUG #2: No maneja el caso en que `node` es null desde el inicio
 *         (falla silenciosamente en el primer insert si el root es null).
 *
 * @param {object|null} node - Nodo raíz del subárbol actual
 * @param {number} value - Valor a insertar
 * @returns {object} - Nuevo subárbol con el valor insertado
 */
export const insert = (node, value) => {
  // BUG #6: Manejo de NaN — un NaN rompería todas las comparaciones
  if (typeof value !== "number" || isNaN(value)) {
    console.warn(`insert(): valor inválido ignorado → ${value}`);
    return node;
  }
  if (node === null) {
    return createNode(value); 
  }

  // BUG: La comparación siempre va a la derecha
  // Debería ir a la izquierda cuando value < node.value
  // BUG #1 CORREGIDO: Rama izquierda cuando value es menor
  if (value < node.value) {
    return {
      ...node,
      left: insert(node.left, value),
    };
  }
  if (value > node.value) {
    return {
      ...node,
      right: insert(node.right, value),
    };
  }
  // Los duplicados simplemente caen aquí y retornan el nodo sin cambios
  return node;
};

/**
 * Busca un valor en el árbol.
 *
 * BUG #3: Usa == en vez de ===, lo que causa coerción de tipos.
 * Buscar "5" (string) encontrará el nodo con valor 5 (number).
 *
 * @param {object|null} node
 * @param {number|string} value
 * @returns {object|null} - El nodo encontrado, o null
 */
export const search = (node, value) => {
  // BUG #6: Un NaN nunca sería encontrado y traversaría todo el árbol inútilmente
  if (typeof value !== "number" || isNaN(value)) {
    console.warn(`search(): valor inválido ignorado → ${value}`);
    return null;
  }
  if (node === null) return null;


  if (node.value === value) return node; 

  if (value < node.value) {
    return search(node.left, value);
  }

  return search(node.right, value);
};

// ─── Traversals ──────────────────────────────────────────────────────────────

/**
 * Recorrido In-Order (izquierda → raíz → derecha).
 * En un BST válido, produce los valores en orden ascendente.
 *
 * TODO: Implementar esta función.
 * Debe retornar un array de valores en orden in-order.
 *
 * @param {object|null} node
 * @returns {number[]}
 */
export const inOrder = (node) => {
  if (node === null) return [];

  return [
    ...inOrder(node.left),   // 1. Recorre subárbol izquierdo
    node.value,               // 2. Visita la raíz
    ...inOrder(node.right),  // 3. Recorre subárbol derecho
  ];
};

/**
 * Recorrido Pre-Order (raíz → izquierda → derecha).
 *
 * TODO: Implementar esta función.
 *
 * @param {object|null} node
 * @returns {number[]}
 */
export const preOrder = (node) => {
  if (node === null) return [];

  return [
    node.value,               // 1. Visita la raíz primero
    ...preOrder(node.left),  // 2. Recorre subárbol izquierdo
    ...preOrder(node.right), // 3. Recorre subárbol derecho
  ];
};

/**
 * Recorrido Post-Order (izquierda → derecha → raíz).
 *
 * TODO: Implementar esta función.
 *
 * @param {object|null} node
 * @returns {number[]}
 */
export const postOrder = (node) => {
   if (node === null) return [];

  return [
    ...postOrder(node.left),  // 1. Recorre subárbol izquierdo
    ...postOrder(node.right), // 2. Recorre subárbol derecho
    node.value,                // 3. Visita la raíz al final
  ];
};

// ─── Tree Transformation ─────────────────────────────────────────────────────

/**
 * Transforma la estructura interna del BST al formato que espera react-d3-tree.
 *
 * react-d3-tree espera: { name: string, children: Array }
 * Nuestra estructura interna es: { value: number, left: Node|null, right: Node|null }
 *
 * BUG #4 (sutil): Esta función ignora el hijo derecho cuando un nodo
 * tiene SOLO hijo derecho (no tiene hijo izquierdo).
 * Pruébalo insertando: 10, 15, 20 → el árbol visual se rompe.
 *
 * @param {object|null} node
 * @returns {object|null} - Nodo en formato react-d3-tree, o null
 */
export const toD3Format = (node) => {
  if (node === null) return null;

  const children = [];

  // BUG: Si node.left es null pero node.right no, nunca se agrega node.right
  if (node.left !== null) {
    children.push(toD3Format(node.left));
  }
  if (node.right !== null) {
      children.push(toD3Format(node.right));
  }

  return {
    name: String(node.value),
    children,
  };
};

// ─── Utilities ────────────────────────────────────────────────────────────────

/**
 * Calcula la altura del árbol.
 * TODO: Implementar. Útil para validar que el BST está balanceado.
 *
 * @param {object|null} node
 * @returns {number}
 */
export const getHeight = (node) => {
  if (node === null) return 0;

  const leftHeight  = getHeight(node.left);
  const rightHeight = getHeight(node.right);

  // Altura = 1 (nodo actual) + la mayor altura entre ambos subárboles
  return 1 + Math.max(leftHeight, rightHeight);
};

/**
 * Genera un número entero aleatorio entre min y max (inclusivo).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
