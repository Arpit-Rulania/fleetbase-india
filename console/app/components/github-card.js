import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

/**
 * FleetIndia: do not fetch api.github.com/repos/fleetbase/fleetbase (would
 * advertise this install's IP and interest in the upstream repo).
 */
export default class GithubCardComponent extends Component {
    @tracked data = {
        owner: {
            avatar_url: '',
        },
        full_name: '',
        description: '',
        stargazers_count: 0,
        forks_count: 0,
        open_issues_count: 0,
        html_url: '#',
    };
    @tracked tags = [];

    @computed('tags.length') get latestRelease() {
        return { name: '' };
    }

    @computed get releaseUrl() {
        return '#';
    }

    constructor() {
        super(...arguments);
        this.getRepositoryData.perform();
        this.getRepositoryTags.perform();
    }

    @task *getRepositoryData() {
        return;
    }

    @task *getRepositoryTags() {
        this.tags = [];
        return;
    }
}
