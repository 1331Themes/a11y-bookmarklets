//Highlight all headings on page, ensures there is at least level-one heading, and headings are in the correct order
javascript:(function() {
  function createStyleTag(css) {
      const styleTag = document.createElement('style');
      styleTag.type = 'text/css';
      styleTag.appendChild(document.createTextNode(css));
      return styleTag;
  }

  function highlightHeadings() {
      const css = `
          h1, h2, h3, h4, h5, h6 {
              outline: 3px solid blue !important;
              background-color: rgba(0, 0, 255, 0.1) !important;
              position: relative;
              color: black;
          }
          h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
              content: attr(data-heading-type);
              font-weight: bold;
              position: absolute;
              top: 2px;
              left: 2px;
              background-color: yellow;
              padding: 2px;
              font-family: Arial, sans-serif;
              font-size: 12px;
          }
      `;
      document.head.appendChild(createStyleTag(css));
  }

  function annotateHeadingTypes() {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      headings.forEach((heading) => {
          heading.setAttribute('data-heading-type', heading.tagName);
      });
  }

  function checkHeadingsOrder() {
      let prevLevel = 0;
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const incorrectOrder = [];

      headings.forEach((heading) => {
          const level = parseInt(heading.tagName.slice(1));
          if (level - prevLevel > 1) {
              incorrectOrder.push(heading);
          }
          prevLevel = level;
      });

      return incorrectOrder;
  }

  function main() {
      const h1Count = document.querySelectorAll('h1').length;
      if (h1Count < 1) {
          alert('There is no level-one heading on this page.');
      }

      annotateHeadingTypes();
      highlightHeadings();

      const incorrectOrderHeadings = checkHeadingsOrder();
      if (incorrectOrderHeadings.length > 0) {
          alert('Headings are not in the correct order. Check the highlighted headings.');
      } else {
          alert('All headings are in the correct order.');
      }
  }

  main();
})();