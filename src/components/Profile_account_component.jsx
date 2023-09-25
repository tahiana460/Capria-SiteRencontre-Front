import AssociatedAccount from './Profile_account_content.jsx'

export default function Profile_account_component(props){
    const user=props.user

    return (
        <div class="tab-pane fade" id="myAccount" role="tabpanel">
            <div class="p-lr-15-md" style={{ paddingLeft:"30%" }} >                
                <AssociatedAccount user={user} googleAppId={import.meta.env.GOOGLE_APP_ID}  />
            </div>
        </div>
    )
}