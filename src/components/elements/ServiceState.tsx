import { IconAlertOctagon, IconAlertTriangle, IconCircleCheck, IconHelpHexagon, IconProgressCheck } from "@tabler/icons-react";

type Props = {
  label: {
    name: string,
    color: string,
  } | undefined;
};

function ServiceState(props: Props) {
  const color = `#${props.label?.color}`

  switch (props.label?.name) {
    case 'operational':
      return <IconCircleCheck color={color} />

    case 'recovering':
      return <IconProgressCheck color={color} />

    case 'degraded':
      return <IconAlertTriangle color={color} />

    case 'down':
      return <IconAlertOctagon color={color} />

    default:
      return <IconHelpHexagon color="#00a6f4" />
  }
}

export default ServiceState;
