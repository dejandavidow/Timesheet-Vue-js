<template>
    <div class="backgroundheader">
        <n-button type="primary" @click="showModal = true">
            Create Category
        </n-button>
        <input type='search' placeholder='Search' :value="searchTerm" @input="e => setTerm(e.target.value)"
            class="mleft" />
        <n-modal v-model:show="showModal">
            <n-card style="width: 600px" title="New Category" :bordered="false" size="large" role="dialog"
                aria-modal="true">
                <n-form inline :label-width="80">
                    <n-form-item label="Category Name">
                        <n-input v-model:value="categoryname" />
                    </n-form-item>
                    <n-form-item>
                        <n-button type="warning" @click="postCategory">
                            Create
                        </n-button>
                    </n-form-item>
                </n-form>
            </n-card>
        </n-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false,
            categoryname: null,
        }
    },
    methods: {
        async postCategory() {
            await fetch('http://127.0.0.1:8000/api/Categories/', { method: "POST", headers: { 'Content-type': 'application/json' }, body: JSON.stringify({categoryname:this.categoryname}) })
                .then(x => {
                    this.showModal = false;
                    this.setCreated(true);
                })
                setTimeout(() => {
                    this.setCreated(false);
                }, 2000);
                this.categoryname = null;
        },
    },
    props: {
        setCreated: {
            type: Function
        },
        setTerm:
        {
            type: Function
        },
        searchTerm:
        {
            type: String
        },
        isCreated: Boolean
    },
}
</script>

<style scoped>
.backgroundheader {
    padding: 30px;
}

.mleft {
    margin-left: 10px;
}
</style>