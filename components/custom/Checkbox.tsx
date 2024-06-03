"use client";

import {
  CheckboxProps,
  Checkbox as MTCheckbox,
  Typography,
} from "@/libraries/material-tailwind";
import { IComponent } from "@/utils/interfaces";
import { TColor } from "@/utils/types";
import { useEffect, useState } from "react";

interface IProps extends IComponent {
  color: TColor;
  label: CheckboxProps["label"];
  labelProps?: CheckboxProps["labelProps"];
  name?: CheckboxProps["name"];
  checked?: CheckboxProps["checked"];
  onChange?: CheckboxProps["onChange"];
}

export default function Checkbox({
  className: propClassName = "",
  color = "primary",
  label,
  name,
  checked,
  onChange,
}: IProps) {
  const [classNameOfIconProps, setClassNameOfIconProps] =
    useState<string>("bg-primary");
  const [className, setClassName] = useState<string>(
    "border-primary checked:border-primary checked:bg-primary",
  );

  useEffect(() => {
    switch (color) {
      case "secondary":
        setClassNameOfIconProps("bg-secondary");
        return setClassName(
          "border-secondary checked:border-secondary checked:bg-secondary",
        );

      case "success":
        setClassNameOfIconProps("bg-success");
        return setClassName(
          "border-success checked:border-success checked:bg-success",
        );

      case "info":
        setClassNameOfIconProps("bg-info");
        return setClassName("border-info checked:border-info checked:bg-info");

      case "warning":
        setClassNameOfIconProps("bg-warning");
        return setClassName(
          "border-warning checked:border-warning checked:bg-warning",
        );

      case "error":
        setClassNameOfIconProps("bg-error");
        return setClassName(
          "border-error checked:border-error checked:bg-error",
        );

      case "dark":
        setClassNameOfIconProps("bg-dark");
        return setClassName("border-dark checked:border-dark checked:bg-dark");

      case "lightDark":
        setClassNameOfIconProps("bg-lightDark");
        return setClassName(
          "border-lightDark checked:border-lightDark checked:bg-lightDark",
        );

      default:
        setClassNameOfIconProps("bg-primary");
        return setClassName(
          "border-primary checked:border-primary checked:bg-primary",
        );
    }
  }, [color]);

  return (
    <MTCheckbox
      crossOrigin=""
      className={`border ${className} ${propClassName}`}
      iconProps={{
        className: classNameOfIconProps,
      }}
      containerProps={{
        className: "p-1",
      }}
      label={
        <Typography
          placeholder=""
          className="ml-2 text-lightDark text-sm font-semibold"
        >
          {label}
        </Typography>
      }
      labelProps={{
        className: "flex-1",
      }}
      name={name}
      checked={checked}
      onChange={onChange}
    />
  );
}
