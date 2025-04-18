"use client";

import Blockeight from "@/components/Blockeight";
import Blockfive from "@/components/Blockfive";
import Blockfour from "@/components/Blockfour";
import Blockone from "@/components/Blockone";
import Blockseven from "@/components/Blockseven";
import Blocksix from "@/components/Blocksix";
import Blockthree from "@/components/Blockthree";
import Blocktwo from "@/components/Blocktwo";
import Blockzero from "@/components/Blockzero";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedBlock({
  children,
  initial = { x: 0, y: 0, scaleX: 1, scaleY: 1 },
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  const x = useTransform(scrollYProgress, [1, 0], [0, initial.x]);
  const y = useTransform(scrollYProgress, [1, 0], [0, initial.y]);
  const scaleX = useTransform(
    scrollYProgress,
    [1, 0],
    [1, initial.scaleX || 1]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [1, 0],
    [1, initial.scaleY || 1]
  );
  const opacity = useTransform(scrollYProgress, [1, 0], [0, 0.2]);

  return (
    <motion.div
      ref={ref}
      className="relative  w-full h-full flex items-center justify-center text-white text-xl font-bold"
      style={{ x, y, scaleX, scaleY }}
    >
      <motion.div
        style={{
          opacity,
          transform: `scale(${1 / scaleX.get()}, ${1 / scaleY.get()})`,
          transformOrigin: "center",
        }}
        className="absolute bottom-0  w-[800vh] h-[1px]  bg-sky-600  -z-50"
      ></motion.div>
      <motion.div
        style={{
          opacity,
          transform: `scale(${1 / scaleX.get()}, ${1 / scaleY.get()})`,
          transformOrigin: "center",
        }}
        className="absolute top-0  w-[800vh] h-[1px]  bg-sky-600  -z-50"
      ></motion.div>
      <motion.div
        style={{
          opacity,
          transform: `scale(${1 / scaleX.get()}, ${1 / scaleY.get()})`,
          transformOrigin: "center",
        }}
        className="absolute right-0  h-[800vh] w-[1px]  bg-sky-600 -z-50 "
      ></motion.div>
      <motion.div
        style={{
          opacity,
          transform: `scale(${1 / scaleX.get()}, ${1 / scaleY.get()})`,
          transformOrigin: "center",
        }}
        className="absolute left-0  h-[800vh] w-[1px]  bg-sky-600 -z-50 "
      ></motion.div>
      

      {children}

    </motion.div>
  );
}

// Table with animated blocks in specific cells
export default function Home() {
  // Define where each block should appear (row, col, span, color, label, initial pos)
  const blocks = [
    {
      id: "1",
      row: 0,
      col: 0,
      rowSpan: 5,
      // bg: "bg-orange-400",

      colSpan: 2,
      initial: { x: -323, y: -800, scaleX: 1, scaleY: 1 },
      component: Blockone,
    },
    {
      id: "2",
      row: 0,
      col: 2,
      rowSpan: 4,
      colSpan: 4,
      initial: { x: 9, y: -407, scaleX: 1, scaleY: 1 },
      component: Blocktwo,
    },
    {
      id: "3",
      row: 0,
      col: 6,
      rowSpan: 5,
      colSpan: 3,
      initial: { x: 1000, y: -510, scaleX: 1, scaleY: 1 },
      component: Blockthree,
    },
    {
      id: "4",
      row: 0,
      col: 9,
      rowSpan: 4,
      colSpan: 3,
      initial: { x: 1280, y: -262, scaleX: 1, scaleY: 1 },
      component: Blockfour,
    },
    {
      id: "0",
      row: 4,
      col: 5,
      rowSpan: 1,
      colSpan: 1,
      initial: { x: 0, y: 0, scaleX: 5, scaleY: 7 },
      component: Blockzero,
    },
    {
      id: "5",
      row: 5,
      col: 0,
      rowSpan: 4,
      colSpan: 2,
      initial: { x: -900, y: 100, scaleX: 1, scaleY: 1 },
      component: Blockfive,
    },
    {
      id: "6",
      row: 4,
      col: 2,
      rowSpan: 5,
      colSpan: 3,
      initial: { x: -800, y: 500, scaleX: 1, scaleY: 1 },
      component: Blocksix,
    },
    {
      id: "7",
      row: 5,
      col: 5,
      rowSpan: 4,
      colSpan: 4,
      initial: { x: 0, y: 404, scaleX: 1, scaleY: 1 },
      component: Blockseven,
    },
    {
      id: "8",
      row: 4,
      col: 9,
      rowSpan: 5,
      colSpan: 3,
      initial: { x: 900, y: -115, scaleX: 1, scaleY: 1 },
      component: Blockeight,
    },
  ];

  return (
    <div className="relative w-screen h-[400vh] overflow-hidden bg-white">
      <div className="fixed top-0 left-0 w-screen h-screen -m-2 p-5">
        <table className=" border-separate border-spacing-2 table-fixed w-full h-full ">
          <tbody>
            {Array.from({ length: 9 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="h-[11.11%]">
                {Array.from({ length: 12 }).map((_, colIndex) => {
                  const block = blocks.find(
                    (b) => b.row === rowIndex && b.col === colIndex
                  );

                  if (block) {
                    return (
                      <td
                        key={colIndex}
                        rowSpan={block.rowSpan}
                        colSpan={block.colSpan}
                        className={``}
                        style={{ width: `${(block.colSpan / 12) * 100}%` }}
                      >
                        <AnimatedBlock
                          initial={
                            block.initial || {
                              x: 0,
                              y: 0,
                              scaleX: 1,
                              scaleY: 1,
                            }
                          }
                        >
                          <div
                            className={`w-full h-full ${block.bg}  flex items-center justify-center`}
                          >
                            <block.component />
                          </div>
                        </AnimatedBlock>
                      </td>
                    );
                  }

                  // If a cell is covered by a rowspan/colspan above, skip rendering it
                  const isCovered = blocks.some((b) => {
                    const inRow =
                      rowIndex >= b.row && rowIndex < b.row + b.rowSpan;
                    const inCol =
                      colIndex >= b.col && colIndex < b.col + b.colSpan;
                    return (
                      inRow &&
                      inCol &&
                      !(b.row === rowIndex && b.col === colIndex)
                    );
                  });

                  return isCovered ? null : (
                    <td key={colIndex} className="border border-gray-700"></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
