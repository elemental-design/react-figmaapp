const { widget } = figma;
const { Frame, AutoLayout, Text: _Text, SVG } = widget as any;

figma.showUI(__html__, { themeColors: true, height: 300 });

const App = ({ svg }) => (
  <AutoLayout
    verticalAlignItems="center"
    spacing={8}
    padding={16}
    cornerRadius={8}
    fill="#fff"
    stroke="#E6E6E6"
  >
    <_Text fontSize={36} horizontalAlignText="center" fill="#000">
      Button Test
    </_Text>
    <SVG src={svg} />
  </AutoLayout>
)

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-components') {
    // @ts-ignore
    const node = await figma.createNodeFromJSXAsync(
      <AutoLayout key="123">
        <App svg={msg.svg} />
      </AutoLayout>
    )
    node.clone()
    node.remove()

    figma.ui.postMessage({
      type: 'created-components',
      message: `Created components`,
    });
  }
}
