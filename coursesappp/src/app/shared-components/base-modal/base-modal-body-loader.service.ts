import {
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ViewContainerRef,
  Component,
  Type
} from '@angular/core';

export interface IComponentInputParameters {
  name: string;
  value: any;
}

@Injectable()
export class BaseModalBodyLoaderService {
  private rootViewContainer: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  public setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  public addBodyComponent(baseModalBodyComponent: Type<{}>, componentInputParameters: IComponentInputParameters[] = []) {
    const factory = this.factoryResolver.resolveComponentFactory(baseModalBodyComponent);
    const component = factory.create(this.rootViewContainer.parentInjector);

    for (const componentInputParameter of componentInputParameters) {
      component.instance[componentInputParameter.name] = componentInputParameter.value;
    }

    this.rootViewContainer.insert(component.hostView);
  }
}
