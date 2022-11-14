import { createIcons, HelpCircle, Plus, XCircle, CornerRightDown } from 'lucide';

export default function () {
  createIcons({
    attrs: {
      class: ['icon'],
      'stroke-width': 2
    },
    icons: {
      HelpCircle,
      Plus,
      XCircle,
      CornerRightDown
    }
  })
}
