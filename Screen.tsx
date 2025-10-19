import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const inputFields = [
  { placeholder: "Имя" },
  { placeholder: "Фамилия" },
  { placeholder: "Номер телефона" },
  { placeholder: "Пароль" },
];

export const Screen = (): JSX.Element => {
  return (
    <div className="bg-[#ffffff] w-full min-w-[375px] min-h-[812px] flex flex-col">
      <header className="flex z-[5] flex-col w-full items-start fixed top-0 left-0 bg-color-paletteneutral00">
        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative self-stretch w-full h-11 bg-color-paletteneutral00">
            <div className="absolute top-[calc(50.00%_-_8px)] left-[21px] w-[54px] [font-family:'DM_Sans',Helvetica] font-bold text-black-1 text-[15px] text-center tracking-[-0.30px] leading-[normal]">
              9:41
            </div>

            <img
              className="absolute top-[17px] left-[336px] w-6 h-[11px]"
              alt="Battery"
              src="/figmaAssets/battery.png"
            />

            <img
              className="absolute top-[17px] right-11 w-[15px] h-[11px]"
              alt="Wifi"
              src="/figmaAssets/wifi.svg"
            />

            <img
              className="absolute top-[18px] right-16 w-[17px] h-[11px]"
              alt="Cellular connection"
              src="/figmaAssets/cellular-connection.svg"
            />
          </div>
        </div>
      </header>

      <main className="flex flex-col items-start px-4 pt-[177px]">
        <h1 className="z-[1] w-[199px] h-9 [font-family:'Lab_Grotesque-Bold',Helvetica] font-bold text-blackstar text-3xl tracking-[-0.30px] leading-[normal] whitespace-nowrap">
          Регистрация
        </h1>

        <div className="inline-flex z-[2] w-full max-w-[343px] flex-col items-start gap-2 mt-4">
          {inputFields.map((field, index) => (
            <div key={index} className="w-full">
              <Input
                placeholder={field.placeholder}
                className="w-full h-[58px] bg-gray-2 border-0 rounded-xl px-4 [font-family:'Lab_Grotesque-Medium',Helvetica] font-medium text-gray-5 text-sm placeholder:text-gray-5"
              />
            </div>
          ))}
        </div>

        <Button className="z-[4] w-full max-w-[343px] h-[60px] mt-4 bg-[#ba2135] hover:bg-[#a01d2e] rounded-[100px] [font-family:'Arial-Bold',Helvetica] font-bold text-[#ffffff] text-base tracking-[-0.32px] leading-[22px] shadow-BG-blur-80 h-auto">
          Зарегистрироваться
        </Button>

        <div className="flex items-center justify-center z-[3] w-full max-w-[319px] h-12 mt-4 [font-family:'Lab_Grotesque-Medium',Helvetica] font-normal text-base text-center tracking-[0] leading-6 mx-auto">
          <span className="font-medium text-[#979797]">Уже есть аккаунт?</span>
          <span className="font-medium text-[#191919]">
            {" "}
            <br />
          </span>
          <span className="font-medium text-[#333333]">Вход</span>
        </div>
      </main>
    </div>
  );
};
