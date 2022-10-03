<template>
    <div v-if="loaded">
        <div v-for="category in categories" :key="category.id">
            <div class="accordion accordion-flush border" id="accordionFlushExample">
                <div class="accordion-item ">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            :data-bs-target="`#a${category.id}`" aria-expanded="false"
                            aria-controls="flush-collapseOne">
                            {{category.categoryname}}
                        </button>
                    </h2>
                    <div v-bind:id="'a'+category.id" class="accordion-collapse collapse listcolor"
                        aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <n-form inline :label-width="80">
                                <n-form-item label="Category Name">
                                    <n-input v-model:value="category.categoryname" />
                                </n-form-item>
                                <n-form-item>
                                    <n-button @click="handleUpdate(category.id,category)" type="primary">
                                        Update
                                    </n-button>
                                    <n-button class="mleft" type="error" @click="deleteCategory(category.id)">
                                        Delete
                                    </n-button>
                                </n-form-item>
                            </n-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <n-pagination class="mt-3" v-model:page="page" :pageCount="pageCount" />
    </div>
    <div v-else class="d-flex justify-content-center">
        <n-spin size="large" />
    </div>
</template>

<script>

export default {
    data() {
        return {
            categories: [],
            page: 1,
            pageCount: 1,
            loaded: false
        }
    },
    props: {
        isCreated: {
            type: Boolean
        },
        setCreated: Function,
        searchTerm: String
    },
    methods: {
        async getCategories() {
            await fetch(`http://127.0.0.1:8000/api/Categories?page=${this.page}`,
                { method: 'GET', headers: { 'Content-Type': 'application/json' } })
                .then(x => x.json())
                .then(data => {
                    this.categories = data.data;
                    this.pageCount = Math.ceil(data.total / 5);
                    this.loaded = true;
                })
        },
        async handleUpdate(id, name) {
            await fetch(`http://127.0.0.1:8000/api/Categories/${id}`, {
                method: "PUT", body: JSON.stringify(name), headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
        },
        async deleteCategory(id) {
            await fetch(`http://127.0.0.1:8000/api/Categories/${id}`, {
                method: "DELETE", headers: { 'Content-Type': 'application/json' }
            }).then(res => {
                this.setCreated(true);
                setTimeout(() => {
                    this.setCreated(false);
                }, 2000);
            })
        },
        async searchCategories() {
            await fetch(`http://127.0.0.1:8000/api/Search?search=${this.searchTerm}`, { method: "GET", headers: { 'Content-Type': 'application/json' } })
                .then(res => res.json()).then((x) => {
                    this.categories = x.data;
                })
        }
    },
    mounted() {
        this.getCategories();
    },
    watch: {
        isCreated(newValue, oldValue) {
            if (newValue === true) {
                this.getCategories();
            }
        },
        page(newPage, old) {
            if (newPage !== old) {
                this.getCategories();
            }
        },
        searchTerm(newValue, oldValue) {
            if (newValue !== '') {
                this.searchCategories();
            }
            else {
                this.getCategories();
            }
        }
    },
}
</script>

<style scoped>
.listcolor {
    background-color: whitesmoke;
}

.border {
    border: 1px solid black;
}

.mleft {
    margin-left: 20px;
}
</style>