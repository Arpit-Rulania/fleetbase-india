import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

/**
 * FleetIndia: blog widget no longer fetches Fleetbase RSS via lookup/fleetbase-blog.
 */
export default class FleetbaseBlogComponent extends Component {
    @service fetch;
    @tracked posts = [];

    constructor() {
        super(...arguments);
        this.loadBlogPosts.perform();
    }

    get formattedPosts() {
        return [];
    }

    @task *loadBlogPosts() {
        this.posts = [];
        return;
    }
}
