import { Helmet } from "@lib/helmet";
import { toJsonLd } from "../lib/seo";

interface JsonLdProps {
  items: Array<Record<string, unknown>>;
}

const JsonLd = ({ items }: JsonLdProps) => {
  return (
    <Helmet>
      {items.map((item, index) => (
        <script key={index} type="application/ld+json">
          {toJsonLd(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default JsonLd;
