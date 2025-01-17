import { CSSProperties, memo, useCallback, useMemo } from "react"
import { Checkbox, Form, Input, InputNumber, Radio, Select, Slider, Space, Switch } from 'antd';
import { useDesignerEngine, useCurrentNode, useChangeNodeMeta, useLanguage, useDesignComponentsParams } from "@rxdrag/react-core";
import { Fieldy, VirtualForm } from "@rxdrag/react-fieldy";
import { ComponentRender, PreviewRoot } from "@rxdrag/react-runner";
import { INodeMeta } from "@rxdrag/schema";
import { BackgroundImageInput, BackgroundPositionInput, BackgroundRepeatInput, BackgroundSizeInput, BorderRadiusSetter, BorderSetter, CheckboxGroup, ColInput, CollapsePanel, ColorInput, DisplaySetter, EffectsInput, EventInput, ExpressionInput, Fold, FoldBase, FoldExtra, FoldExtraItem, FontColorInput, FontDecorationSelect, FontLineHeightInput, FontSelect, FontSizeInput, FontStyleSelect, FontWeightInput, GutterInput, IconInput, ImageInput, JSONInput, MarginStyleSetter, PaddingStyleSetter, SizeInput, SlotSwitch, TabPanel, Tabs, TextAlignSelect, ValueInput } from "@rxdrag/react-antd-props-inputs";
import { ReactionsInput } from "./components";

const propertiesStyle: CSSProperties = {
  flex: 1,
  height: 0,
  width: "100%",
}

export const SettingsForm = memo(() => {
  const engine = useDesignerEngine()
  const currentNode = useCurrentNode()
  const changeMeta = useChangeNodeMeta()
  const lang = useLanguage()
  const { tools } = useDesignComponentsParams()

  const propsSchema = useMemo(() => {
    if (currentNode && currentNode.propsSchema) {
      //翻译
      return engine?.getLoacalesManager()
        .translateDesignerSchema(currentNode?.meta.componentName,
          JSON.parse(JSON.stringify(currentNode.propsSchema))
        )
    } else {
      return undefined
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNode, engine, lang])

  const handleMetaChange = useCallback((meta: INodeMeta) => {
    if (currentNode) {
      changeMeta(currentNode.id, meta)
    }
  }, [changeMeta, currentNode])

  return (
    <PreviewRoot
      components={{
        Tabs,
        TabPanel,
        FormItem: Form.Item,
        Input,
        TextArea: Input.TextArea,
        Select,
        Switch,
        SlotSwitch,
        Fold,
        FoldBase,
        FoldExtra,
        FoldExtraItem,
        Radio,
        Slider,
        InputNumber,
        ColorInput,
        SizeInput,
        FontSelect,
        FontColorInput,
        FontDecorationSelect,
        FontSizeInput,
        FontLineHeightInput,
        FontStyleSelect,
        FontWeightInput,
        TextAlignSelect,
        MarginStyleSetter,
        PaddingStyleSetter,
        BorderRadiusSetter,
        BorderSetter,
        DisplaySetter,
        IconInput,
        GutterInput,
        "Radio.Group": Radio.Group,
        "Checkbox.Group": Checkbox.Group,
        Checkbox: Checkbox,
        CheckboxGroup: CheckboxGroup,
        ColInput,
        BackgroundImageInput,
        BackgroundSizeInput,
        BackgroundRepeatInput,
        BackgroundPositionInput,
        ImageInput,
        CollapsePanel,
        EffectsInput,
        ReactionsInput,
        EventInput,
        ValueInput,
        JSONInput,
        ExpressionInput,
        Space,
        ...tools,
      }}
      localesManager={engine?.getLoacalesManager()}
    >
      <Fieldy>
        <div style={propertiesStyle}>
          {
            currentNode &&
            <VirtualForm
              initialValue={currentNode?.meta}
              onValueChange={handleMetaChange}
              key={currentNode.id}
            >
              <Form
                labelAlign="left"
                colon={false}
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
                autoComplete="off"
                labelWrap={true}
                style={{
                  flex: 1,
                  height: '100%',
                }}
              >
                {
                  propsSchema &&
                  <ComponentRender
                    root={propsSchema}
                  />
                }
              </Form>
            </VirtualForm>
          }
        </div>
      </Fieldy>
    </PreviewRoot>
  )
})