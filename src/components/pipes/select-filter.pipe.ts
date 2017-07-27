import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'selectFilter' })
export class SelectFilterPipe implements PipeTransform {
    public transform(items: any[], search: string): any {
        if (!items || !search) {
            return items;
        }

        return items.filter(item => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    }
}
