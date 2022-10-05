<template>
    <div>
        <div class="backgroundheader">
        <n-button type="primary" @click="showModal = true">
            Create Client
        </n-button>
        <input type='search' placeholder='Search' :value="searchTerm" @input="e => setTerm(e.target.value)"
            class="mleft" />
        <n-modal v-model:show="showModal">
            <n-card style="width: 600px" title="New Client" :bordered="false" size="large" role="dialog"
                aria-modal="true">
                <n-form inline :label-width="80">
                    <n-space vertical>
            <n-form-item label="Client name">
              <n-input v-model:value="clientname" />
            </n-form-item>
            <n-form-item label="Adress">
              <n-input v-model:value="adress" />
            </n-form-item>
            <n-form-item label="City">
              <n-input v-model:value="city" />
            </n-form-item>
            <n-form-item label="Postal Code">
              <n-input v-model:value="postalcode" />
            </n-form-item>
            <n-form-item label="Country">
              <n-input v-model:value="country" />
            </n-form-item>
            <n-form-item>
              <n-button type="primary" @click="postClient">
                Create
              </n-button>
            </n-form-item>
        </n-space>
          </n-form>
            </n-card>
        </n-modal>
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showModal: false,
                    clientname:'',
                    adress:'',
                    city:'',
                    postalcode:'',
                    country:''
            }
        },
        methods: {
            async postClient() {
                await fetch(`http://127.0.0.1:8000/api/Clients`,{
                    method:"POST",headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({
                        clientname:this.clientname,
                        adress:this.adress,
                        city:this.city,
                        postalcode:this.postalcode,
                        country: this.country
                    })
                }).then(res =>{
                        this.setChanged(true);
                        this.showModal = false;
                    })
                setTimeout(() => {
                    this.setChanged(false);
                }, 2000);
            },
        },
        props: {
            setChanged:Function,
            clientsChanged:Boolean,
            searchTerm:String,
            setTerm:Function
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