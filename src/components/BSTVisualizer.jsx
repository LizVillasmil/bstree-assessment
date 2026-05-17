/**
 * BSTVisualizer.jsx
 *
 * Componente principal del visualizador de Árbol Binario de Búsqueda.
 *
 * ✅ CORRECCIONES APLICADAS:
 * - BUG #5: getTraversalResult ahora está envuelto en useCallback para no
 *   recrearse en cada render. traversalResult está en useMemo para que solo
 *   se recalcule cuando root o activeTraversal cambien.
 * - BUG #6: handleInsert ahora valida el input y muestra errorMessage cuando
 *   el usuario ingresa un valor no numérico (ej: "abc").
 * - TODO #1: renderCustomNode resalta el nodo encontrado en amarillo.
 * - TODO #2: errorMessage se renderiza en el JSX debajo del inputGroup.
 */

import { useState, useCallback, useMemo } from "react"; // ✅ BUG #5: añadidos useMemo y useCallback
import Tree from "react-d3-tree";

import { insert, search, inOrder, preOrder, postOrder, toD3Format, randomInt } from "../utils/bst";
import TraversalPanel from "./TraversalPanel";
import SearchBar from "./SearchBar";

import styles from "./BSTVisualizer.module.css";

// ─── Component ───────────────────────────────────────────────────────────────

export default function BSTVisualizer() {
  const [root, setRoot]                 = useState(null);
  const [inputValue, setInputValue]     = useState("");
  const [activeTraversal, setTraversal] = useState(null); // "inOrder" | "preOrder" | "postOrder"
  const [searchTerm, setSearchTerm]     = useState("");
  const [foundNode, setFoundNode]       = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // ── Insert ──────────────────────────────────────────────────────────────────
  const handleInsert = () => {
    const parsed = parseInt(inputValue, 10);

    // ✅ BUG #6 CORREGIDO: Se valida NaN y se muestra mensaje de error al usuario.
    // Antes: el if simplemente no ejecutaba nada y el input quedaba en pantalla
    // sin ningún feedback. Ahora se le avisa al usuario qué salió mal.
    if (isNaN(parsed)) {
      setErrorMessage("⚠️ Valor inválido. Por favor ingresa un número entero.");
      return;
    }

    setRoot((prevRoot) => insert(prevRoot, parsed));
    setInputValue("");
    setErrorMessage(""); // Limpia el error si el insert fue exitoso
  };

  // ── Random Insert ───────────────────────────────────────────────────────────
  const handleRandomInsert = () => {
    const value = randomInt(1, 99);
    setRoot((prevRoot) => insert(prevRoot, value));
    setErrorMessage(""); // Un insert aleatorio siempre es válido, limpia errores previos
  };

  // ── Search ──────────────────────────────────────────────────────────────────
  const handleSearch = () => {
    const parsed = parseInt(searchTerm, 10);

    // Misma validación de NaN aplicada también a la búsqueda
    if (isNaN(parsed)) {
      setErrorMessage("⚠️ Valor de búsqueda inválido. Ingresa un número entero.");
      return;
    }

    const result = search(root, parsed);
    setFoundNode(result ? result.value : null);
    setErrorMessage("");
  };

  // ── Derived data ────────────────────────────────────────────────────────────
  const d3Data = useMemo(
    // ✅ BUG #5 CORREGIDO (parte 1): toD3Format solo se recalcula cuando root cambia,
    // no en cada render. Con árboles grandes esto evita trabajo redundante.
    () => (root ? toD3Format(root) : null),
    [root]
  );

  // ✅ BUG #5 CORREGIDO (parte 2): getTraversalResult ahora es una función
  // estable entre renders (useCallback). Solo se recrea si cambia root.
  // Antes era una función suelta fuera del componente que no tenía acceso
  // al root del closure y se recreaba igual en cada render.
  const getTraversalResult = useCallback(
    (type) => {
      switch (type) {
        case "inOrder":   return inOrder(root);
        case "preOrder":  return preOrder(root);
        case "postOrder": return postOrder(root);
        default: return [];
      }
    },
    [root]
  );

  // ✅ BUG #5 CORREGIDO (parte 3): traversalResult solo se recalcula
  // cuando activeTraversal o la función getTraversalResult cambian
  // (la función cambia solo cuando root cambia, ver arriba).
  const traversalResult = useMemo(
    () => (activeTraversal ? getTraversalResult(activeTraversal) : []),
    [activeTraversal, getTraversalResult]
  );

  // ── Node Rendering ──────────────────────────────────────────────────────────
  /**
   * ✅ TODO IMPLEMENTADO: Los nodos que coincidan con foundNode se resaltan
   * en amarillo (#F5A623) con borde oscuro para distinguirlos del resto.
   * El resto de nodos mantiene el color azul original (#4A90D9).
   */
  const renderCustomNode = useCallback(
    ({ nodeDatum }) => {
      const isFound = nodeDatum.name === String(foundNode);

      return (
        <g>
          <circle
            r={20}
            fill={isFound ? "#F5A623" : "#4A90D9"} // Amarillo si encontrado, azul si no
            stroke={isFound ? "#B07300" : "#fff"}   // Borde acorde al estado
            strokeWidth={isFound ? 3 : 2}
          />
          <text
            fill={isFound ? "#1a1a1a" : "white"} // Texto oscuro sobre fondo amarillo
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            fontWeight="bold"
          >
            {nodeDatum.name}
          </text>
        </g>
      );
    },
    [foundNode] // Solo se recrea si foundNode cambia
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>BST Visualizer</h1>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.inputGroup}>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInsert()}
            placeholder="Ingresa un número..."
            className={styles.input}
          />
          <button onClick={handleInsert} className={styles.button}>
            Insertar
          </button>
          <button onClick={handleRandomInsert} className={`${styles.button} ${styles.secondary}`}>
            🎲 Aleatorio
          </button>
        </div>

        {/* ✅ TODO IMPLEMENTADO: errorMessage se muestra cuando existe */}
        {errorMessage && (
          <p className={styles.errorMessage} role="alert">
            {errorMessage}
          </p>
        )}

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
          result={foundNode}
        />
      </div>

      {/* Traversal Selector */}
      <TraversalPanel
        active={activeTraversal}
        onChange={setTraversal}
        result={traversalResult}
      />

      {/* Tree Visualization */}
      <div className={styles.treeContainer}>
        {d3Data ? (
          <Tree
            data={d3Data}
            orientation="vertical"
            renderCustomNodeElement={renderCustomNode}
            separation={{ siblings: 1.5, nonSiblings: 2 }}
            translate={{ x: 400, y: 60 }}
          />
        ) : (
          <div className={styles.emptyState}>
            <p>El árbol está vacío.</p>
            <p>Inserta un número para comenzar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
