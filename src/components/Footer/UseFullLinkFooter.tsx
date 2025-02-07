// src/componets/Footer/UseFullLinkFooter.tsx
import Link from "next/link";

export default function UsefulLinksSection() {
  const links = ["About", "News", "Partners", "Team", "Menu", "Contact"];
  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-4 md:mb-6">Useful Links</h3>
      <ul className="text-base flex flex-col gap-2 md:gap-4">
        {links.map((link) => (
          <li key={link}>
            <Link
              href="#"
              className="hover:text-[#FF9F0D] transition duration-300"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}





