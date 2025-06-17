// Shape AI Widget
(function() {
  const apiKey = 'W2773CXEGKVNEIGPMV3BDDJBE9XQOKFNBMIWDODGX1W';
  
  // Crear el contenedor del widget
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'shape-ai-widget';
  widgetContainer.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 24px;
    width: 384px;
    height: 600px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    display: none;
    z-index: 1000;
  `;

  // Crear el iframe
  const iframe = document.createElement('iframe');
  iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 12px;
  `;
  iframe.src = `https://shapes.inc/crombot?apiKey=${apiKey}`;
  
  widgetContainer.appendChild(iframe);
  document.body.appendChild(widgetContainer);

  // Exponer las funciones de control
  window.ShapeAI = {
    open: () => {
      widgetContainer.style.display = 'block';
    },
    close: () => {
      widgetContainer.style.display = 'none';
    },
    toggle: () => {
      if (widgetContainer.style.display === 'none') {
        widgetContainer.style.display = 'block';
      } else {
        widgetContainer.style.display = 'none';
      }
    }
  };
})(); 