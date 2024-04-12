import React, { useState } from "react";
import { Resizable, ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

function ResizableSidebar() {
  const [width, setWidth] = useState(200); // Default sidebar width

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* <ResizableBox
        width={width}
        height={Infinity}
        axis="x"
        resizeHandles={["e"]}
        minConstraints={[100, Infinity]} // Minimum size
        maxConstraints={[300, Infinity]} // Maximum size
        onResize={(event, { size }) => setWidth(size.width)}
        style={{ overflow: "auto" }}
      >
        <div style={{ padding: 20 }}>
        
          <p>Sidebar content</p>
        </div>
      </ResizableBox> */}
      <ResizableBox
        width={200}
        height={200}
        draggableOpts={{ grid: [25, 25] }}
        minConstraints={[100, 100]}
        maxConstraints={[300, 300]}
      >
        <span>Contents</span>
      </ResizableBox>
      <div style={{ flex: 1, padding: 20 }}>
        {/* Main content goes here */}
        <p>Main content</p>
      </div>
    </div>
  );
}

export default ResizableSidebar;
