import fs from "fs";
import path from "path";

const root = process.cwd();
const source = path.join(root, "index.html");

// ✅ Define all your brand versions here
const brands = [
  {
    name: "octiot",
    favicon: "/OCTIOT.ico",
    title: "OCTIOT",
    ogTitle: "OCTIOT",
    description: "OCTIOT",
  },
];

// Read main index.html
let baseHTML = fs.readFileSync(source, "utf8");

// Helper function to safely replace tags
function replaceTag(content, tag, newValue, regex) {
  if (regex.test(content)) return content.replace(regex, newValue);
  return content.replace(tag, newValue);
}

brands.forEach((brand) => {
  let html = baseHTML;

  // Replace favicon
  html = replaceTag(
    html,
    `<link rel="icon" href="${brand.favicon}" />`,
    `<link rel="icon" href="${brand.favicon}" />`,
    /<link rel="icon"[^>]+>/
  );

  // Replace <title>
  html = replaceTag(
    html,
    `<title>${brand.title}</title>`,
    `<title>${brand.title}</title>`,
    /<title>.*<\/title>/
  );





  // Write to new HTML file
  const target = path.join(root, `index-${brand.name}.html`);
  fs.writeFileSync(target, html);

  console.log(`✅ Generated index-${brand.name}.html`);
});

console.log("🎉 All branded HTML files generated successfully!");
