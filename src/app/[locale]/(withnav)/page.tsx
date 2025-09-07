import Banner from "@/features/pages/main/component/banner";
import Discover from "@/features/pages/main/component/discover";
import Hero from "@/features/pages/main/component/hero";
import hero from "@/assets/images/hero.jpg";
import innovation from "@/assets/images/innovation.jpg";
import Founder from "@/features/pages/main/component/founder";
import ActiveShowcase from "@/features/pages/main/component/active-showcase";
import { useTranslations } from "next-intl";

export default function Home() {

  const t = useTranslations("main.hero")
  return (
    <>
      <Hero
        image={hero}
        title={t("title")}
        description={t("description")}
      />
      <Discover />
      <Banner />
      <ActiveShowcase />
      <Hero
        image={innovation}
        title="Wellness innovation at its scientific best."
      />
      <Founder />
    </>
  );
}
