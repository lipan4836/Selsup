import { Component, useRef } from 'react';
import './App.css';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      paramValues: [...props.model.paramValues],
    };
  }

  public getModel(): Model {
    return {
      ...this.props.model,
      paramValues: this.state.paramValues,
    };
  }

  handleParamChange = (paramId: number, value: string) => {
    this.setState((prevState) => {
      const existParamIdx = prevState.paramValues.findIndex(
        (paramValue) => paramValue.paramId === paramId
      );

      if (existParamIdx >= 0) {
        const newParamValues = [...prevState.paramValues];
        newParamValues[existParamIdx] = { paramId, value };
        return { paramValues: newParamValues };
      } else {
        return {
          paramValues: [...prevState.paramValues, { paramId, value }],
        };
      }
    });
  };

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div className="param-editor">
        {params.map((param) => {
          const paramValue = paramValues.find(
            (item) => item.paramId === param.id
          );
          const value = paramValue ? paramValue.value : '';

          return (
            <div key={param.id} className="param-item">
              <label className="param-label">{param.name}</label>
              <input
                type="text"
                className="param-input"
                value={value}
                onChange={(e) =>
                  this.handleParamChange(param.id, e.target.value)
                }
              />
            </div>
          );
        })}
      </div>
    );
  }
}

// Применение

const exampleParams: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
  { id: 3, name: 'Цвет', type: 'string' },
];

const exampleModel: Model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
    { paramId: 3, value: 'синий' },
  ],
};

const App = () => {
  const paramEditorRef = useRef<ParamEditor>(null);

  const handleGetModel = () => {
    if (paramEditorRef.current) {
      const model = paramEditorRef.current.getModel();
      console.log('current model:', model);
    }
  };

  return (
    <div className="container">
      <ParamEditor
        ref={paramEditorRef}
        params={exampleParams}
        model={exampleModel}
      />
      <button onClick={handleGetModel}>Log Model</button>
    </div>
  );
};

export default App;
