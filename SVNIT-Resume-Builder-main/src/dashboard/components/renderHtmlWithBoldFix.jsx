function renderHtmlWithBoldFix(html) {
  return html
    .replace(/<b>(.*?)<\/b>/g, '<span class="lm-extrabold">$1</span>')
    .replace(/<strong>(.*?)<\/strong>/g, '<span class="lm-extrabold">$1</span>');
}

export default renderHtmlWithBoldFix