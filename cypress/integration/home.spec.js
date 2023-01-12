//const { templateSettings } = require("cypress/types/lodash")

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
describe('Desativação de usuário', () => {

    it('login', ()=> {

        cy.visit('SiteLDAP')
        //usando login de admin irá pedir somente senha 
        var pass = {
            //nome: 'teste',
            //inserir senha de acesso
            password:'inserir senha aqui',
        }

        //definir arquivo json com os dados {"nome":"cpf"}
        var block = {
             users: '/home/defensoria/Documentos/automacao/block-user/cypress/fixtures/cpf.json'
        }
        
        //login
        cy.get('#passwd').type(pass.password)
        cy.get('span[class="ui-button-text"]').click()
        
        //find user
        cy.readFile(block.users).then((data) => {
            for(var index in data) {
                cy.get('#filteruid').type(data[index]).type('{enter}')
                cy.get('a[title="Edit"]').click()
                cy.get('#lam_accountStatus').click()
                
        cy.get('#lam_accountStatusActionDisabled0').then(($a)=> {  
            if($a.attr('checked')){
            
            cy.get('#lam_accountStatusActionDisabled0').should('be.checked')
            cy.contains('div[class="ui-dialog-buttonset"]>button','Ok').first().click()
            cy.get('#btn_accountContainerSaveAccount').click()
            cy.get('#tab_user').click()
            }
                    //unlock user
            else {
            //cy.get('#lam_accountStatusActionDisabled1').should('be.checked')
            cy.contains('div[class="ui-dialog-buttonset"]>button','Cancel').click()
            cy.get('#tab_user').click()
            }
        })

        }

        })
         

    })
    return false
})