import Image from "next/image";

const Logo = () => {
  return (
    <Image
      width={120}
      height={120}
      alt="logo"
      src={"/next.svg"}
      priority
      className="w-[120] h-[120]"
    />
  );
};

export default Logo;
