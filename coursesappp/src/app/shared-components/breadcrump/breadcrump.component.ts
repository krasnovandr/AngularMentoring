import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';

import { IBreadcrumb } from './breadcrump';

@Component({
  selector: 'app-breadcrump',
  templateUrl: './breadcrump.component.html',
  styleUrls: ['./breadcrump.component.css']
})
export class BreadcrumpComponent implements OnInit {
  public breadcrumbs: IBreadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe(event => {
        const root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      url += `/${routeURL}`;
      let label = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
      const id = +child.snapshot.params['id'];

      if (id && id > 0) {
        label += ` ${id}`;
      }

      const breadcrumb: IBreadcrumb = {
        label: label,
        params: child.snapshot.params,
        url: url
      };
      breadcrumbs.push(breadcrumb);

      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }
}

