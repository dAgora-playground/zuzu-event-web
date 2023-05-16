import { ComponentProps, useState } from "react"
import {
  Navbar as MantineNavbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
} from "@mantine/core"
import Link from "next/link"

const LogoIcon = (props: ComponentProps<"svg">) => (
  <svg
    width="58"
    height="49"
    viewBox="0 0 58 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M57.1642 4.3667C57.1507 2.50762 55.6431 1.00684 53.784 1.00684H42.8729C38.5869 1.00684 34.7606 3.70419 33.3207 7.74008L24.3498 32.8748C22.3893 36.2347 19.0632 41.8119 16.7918 44.0022C16.1969 44.5971 15.656 45.0771 15.1693 45.4422C14.6826 45.8072 14.2905 45.9898 13.993 45.9898C13.6415 45.9898 13.3914 45.7869 13.2426 45.3813C13.0939 44.9757 13.1007 44.3538 13.2629 43.5155L18.0086 18.0427C18.0357 17.9887 17.9951 17.9075 17.8869 17.7994C17.7788 17.6912 17.6841 17.6642 17.603 17.7183L12.6139 20.152C12.5058 20.179 12.4787 20.2736 12.5328 20.4359C12.5869 20.5981 12.668 20.6522 12.7762 20.5981C14.0471 19.9762 14.8921 19.7869 15.3113 20.0303C15.7304 20.2736 15.8589 20.828 15.6966 21.6933L13.824 31.5836C13.824 31.5836 13.8173 31.5768 13.8105 31.5768C13.175 31.1577 12.4922 30.9481 11.7621 30.9481C10.5723 30.9481 9.39603 31.2388 8.23326 31.8202C7.07049 32.4016 5.98208 33.2061 4.96804 34.2336C3.954 35.2612 3.09544 36.4375 2.39237 37.7625C1.68931 39.0875 1.20256 40.5072 0.932153 42.0215C0.715824 43.4006 0.736105 44.5025 0.992996 45.3272C1.24989 46.152 1.6555 46.7469 2.20985 47.112C2.76419 47.477 3.36586 47.6595 4.01484 47.6595C5.20465 47.6595 6.34714 47.2066 7.44231 46.3007C8.53747 45.3948 9.57855 44.151 10.5656 42.569C11.201 41.555 11.8027 40.4328 12.3705 39.2362L11.5593 43.5222C11.2889 45.0095 11.2281 46.0438 11.3768 46.6252C11.5255 47.2066 11.9244 47.4973 12.5734 47.4973C13.2764 47.4973 13.9795 47.2201 14.6826 46.6658C15.3856 46.1114 16.1969 45.334 17.1163 44.3335C19.0159 42.2648 21.5443 38.6616 23.4777 35.3288L19.0497 47.7407H28.9603C30.4408 47.7407 31.7455 46.7807 32.1849 45.3678L33.1449 42.2986C34.0237 39.4728 35.6935 31.1645 39.601 31.4078L45.4689 31.4889L45.0768 47.7407H54.0071C55.8797 47.7407 57.4008 46.2128 57.3873 44.3402L57.1642 4.37346V4.3667ZM10.2411 42.0553C9.52447 43.164 8.72676 44.0834 7.84792 44.8135C6.96909 45.5436 6.06997 45.9086 5.15057 45.9086C4.23117 45.9086 3.54162 45.4625 3.08192 44.5701C2.62222 43.6777 2.5411 42.3257 2.83855 40.5139C3.29825 37.8368 4.23793 35.7952 5.65759 34.3891C7.07725 32.983 8.69296 32.2664 10.5047 32.2393C11.4782 32.2123 12.1948 32.4962 12.6545 33.0911C13.1142 33.686 13.2359 34.5378 13.0195 35.6465C12.8573 36.4848 12.5328 37.4853 12.0461 38.6481C11.5593 39.8109 10.9577 40.9466 10.2411 42.0553ZM46.1382 20.7198C46.0029 22.8696 45.239 24.6611 42.5484 24.6611L38.5802 24.6813L41.6696 14.737C42.109 13.3241 43.4205 12.3574 44.8943 12.3574H46.4965L46.1314 20.7131L46.1382 20.7198Z"
      fill="url(#paint0_linear_694_114)"
      stroke="url(#paint1_linear_694_114)"
      strokeMiterlimit="10"
    />
    <defs>
      <linearGradient
        id="paint0_linear_694_114"
        x1="2.98728"
        y1="49.1062"
        x2="63.7487"
        y2="15.386"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8DC63F" />
        <stop offset="0.08" stopColor="#9FB439" />
        <stop offset="0.23" stopColor="#BD9731" />
        <stop offset="0.39" stopColor="#D4812A" />
        <stop offset="0.57" stopColor="#E57125" />
        <stop offset="0.76" stopColor="#EE6722" />
        <stop offset="1" stopColor="#F26522" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_694_114"
        x1="2.68983"
        y1="49.2685"
        x2="64.0461"
        y2="15.2237"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8DC63F" />
        <stop offset="0.08" stopColor="#9FB439" />
        <stop offset="0.23" stopColor="#BD9731" />
        <stop offset="0.39" stopColor="#D4812A" />
        <stop offset="0.57" stopColor="#E57125" />
        <stop offset="0.76" stopColor="#EE6722" />
        <stop offset="1" stopColor="#F26522" />
      </linearGradient>
    </defs>
  </svg>
)

const HomeIcon = (props: ComponentProps<"svg">) => (
  <svg
    width="38"
    height="37"
    viewBox="0 0 38 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.7393 31.5068C26.5013 31.5068 32.7937 25.4627 32.7937 18.0068C32.7937 10.551 26.5013 4.50684 18.7393 4.50684C10.9772 4.50684 4.68481 10.551 4.68481 18.0068C4.68481 25.4627 10.9772 31.5068 18.7393 31.5068Z"
      stroke="#F3A34B"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.26147 25.7974L8.97436 24.799C9.14424 24.6983 9.28451 24.5577 9.38188 24.3903C9.47924 24.2229 9.53047 24.0345 9.53069 23.8427L9.55997 18.7662C9.5623 18.5557 9.62844 18.3505 9.75029 18.1756L12.649 13.8021C12.736 13.6729 12.8493 13.562 12.9822 13.476C13.115 13.39 13.2647 13.3308 13.422 13.3019C13.5793 13.2729 13.7411 13.275 13.8977 13.3078C14.0542 13.3406 14.2021 13.4035 14.3326 13.4927L17.2021 15.4896C17.4497 15.6554 17.751 15.7303 18.0512 15.7006L22.6628 15.0959C22.9426 15.0589 23.1982 14.9236 23.3802 14.7162L26.6303 11.1162C26.823 10.8967 26.9224 10.6155 26.9084 10.3287L26.7474 6.9115"
      stroke="#F3A34B"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.3916 28.6521L25.8105 27.1334C25.6642 26.993 25.4827 26.8912 25.2834 26.838L22.1358 26.0505C21.8594 25.9779 21.6203 25.8103 21.4638 25.5797C21.3073 25.349 21.2443 25.0713 21.2867 24.799L21.6234 22.5209C21.6569 22.3293 21.7401 22.1489 21.8655 21.9964C21.991 21.844 22.1544 21.7245 22.3408 21.649L26.7914 19.863C26.9981 19.7802 27.2252 19.7561 27.4457 19.7935C27.6663 19.8309 27.8711 19.9282 28.0358 20.074L31.6811 23.2802"
      stroke="#F3A34B"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const useNavLinkStyles = createStyles((theme) => ({
  link: {
    width: "auto",
    height: rem(50),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "border-left": "3px solid",

    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}))

interface NavbarLinkProps {
  icon: React.FC<any>
  label: string
  active?: boolean
  onClick?(): void
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useNavLinkStyles()
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.8rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  )
}

const mockdata = [{ icon: HomeIcon, label: "Home" }]

export function Navbar() {
  const [active, setActive] = useState(0)

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ))

  return (
    <MantineNavbar
      width={{ base: 80 }}
      className="rounded-tr-xl rounded-br-xl border max-h-[calc(100%-2rem)] mb-4"
    >
      <Link href="/">
        <Center p="xl">
          <LogoIcon />
        </Center>
      </Link>
      <MantineNavbar.Section className="flex-1 flex w-full items-center justify-center">
        <Stack justify="center" spacing={0} w="100%" p="2px">
          {links}
        </Stack>
      </MantineNavbar.Section>
    </MantineNavbar>
  )
}
